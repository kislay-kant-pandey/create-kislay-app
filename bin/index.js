#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

// Utility functions
const isValidProjectName = (name) => {
  return /^[a-z0-9-]+$/.test(name) && name.length > 0;
};

const checkDirectoryExists = (dirPath) => {
  return fs.existsSync(dirPath);
};

const createProject = async (type, projectName, options) => {
  const currentDir = process.cwd();
  const projectPath = path.join(currentDir, projectName);

  try {
    // Validate project name
    if (!isValidProjectName(projectName)) {
      console.error(chalk.red('❌ Invalid project name. Use only lowercase letters, numbers, and hyphens.'));
      process.exit(1);
    }

    // Check if directory already exists
    if (checkDirectoryExists(projectPath)) {
      console.error(chalk.red(`❌ Directory "${projectName}" already exists. Please choose a different name.`));
      process.exit(1);
    }

    console.log(chalk.blue(`🚀 Creating ${type} project: ${projectName}`));

    // Get user preferences
    const preferences = await getUserPreferences(type);

    // Create project directory
    await fs.ensureDir(projectPath);

    // Copy template files
    const templatePath = path.join(__dirname, '..', 'templates', type);
    await fs.copy(templatePath, projectPath);

    // Generate configuration files
    await generateConfigFiles(projectPath, type, preferences);

    // Initialize npm and install dependencies
    await initializeProject(projectPath, type, preferences);

    // Success message
    console.log(chalk.green(`\n✅ ${type} project "${projectName}" created successfully!`));
    console.log(chalk.yellow('\n📁 Project structure:'));
    console.log(chalk.gray(`   ${projectPath}`));
    
    console.log(chalk.yellow('\n🚀 Next steps:'));
    console.log(chalk.white(`   cd ${projectName}`));
    
    if (type === 'frontend') {
      console.log(chalk.white('   npm run dev'));
    } else {
      console.log(chalk.white('   npm run dev'));
    }
    
    console.log(chalk.gray('\n📖 Check README.md for detailed setup instructions.'));

  } catch (error) {
    console.error(chalk.red(`❌ Error creating project: ${error.message}`));
    process.exit(1);
  }
};

const getUserPreferences = async (type) => {
  const questions = [];

  if (type === 'frontend') {
    questions.push({
      type: 'confirm',
      name: 'useTailwind',
      message: 'Would you like to use TailwindCSS for styling?',
      default: true
    });
  }

  if (type === 'backend') {
    questions.push({
      type: 'list',
      name: 'database',
      message: 'Which database would you like to use?',
      choices: [
        { name: 'None (API only)', value: 'none' },
        { name: 'MongoDB (Mongoose)', value: 'mongodb' },
        { name: 'PostgreSQL (pg)', value: 'postgresql' }
      ],
      default: 'none'
    });
  }

  if (questions.length === 0) {
    return {};
  }

  return await inquirer.prompt(questions);
};

const generateConfigFiles = async (projectPath, type, preferences) => {
  // Generate .env file
  const envContent = type === 'frontend' 
    ? generateFrontendEnv()
    : generateBackendEnv(preferences.database);
  
  await fs.writeFile(path.join(projectPath, '.env'), envContent);

  // Generate .env.example
  const envExampleContent = type === 'frontend'
    ? generateFrontendEnvExample()
    : generateBackendEnvExample(preferences.database);
  
  await fs.writeFile(path.join(projectPath, '.env.example'), envExampleContent);

  // Update package.json with preferences
  await updatePackageJson(projectPath, type, preferences);
};

const generateFrontendEnv = () => {
  return `# Frontend Environment Variables
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=My React App
`;
};

const generateFrontendEnvExample = () => {
  return `# Frontend Environment Variables
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=My React App
`;
};

const generateBackendEnv = (database) => {
  let content = `# Backend Environment Variables
PORT=3000
NODE_ENV=development
`;

  if (database === 'mongodb') {
    content += `MONGODB_URI=mongodb://localhost:27017/myapp
`;
  } else if (database === 'postgresql') {
    content += `DATABASE_URL=postgresql://username:password@localhost:5432/myapp
`;
  }

  return content;
};

const generateBackendEnvExample = (database) => {
  let content = `# Backend Environment Variables
PORT=3000
NODE_ENV=development
`;

  if (database === 'mongodb') {
    content += `MONGODB_URI=mongodb://localhost:27017/myapp
`;
  } else if (database === 'postgresql') {
    content += `DATABASE_URL=postgresql://username:password@localhost:5432/myapp
`;
  }

  return content;
};

const updatePackageJson = async (projectPath, type, preferences) => {
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  if (type === 'frontend' && preferences.useTailwind) {
    // Add TailwindCSS dependencies
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      'tailwindcss': '^3.4.0',
      'postcss': '^8.4.32',
      'autoprefixer': '^10.4.16'
    };
  }

  if (type === 'backend') {
    if (preferences.database === 'mongodb') {
      packageJson.dependencies = {
        ...packageJson.dependencies,
        'mongoose': '^8.0.3'
      };
    } else if (preferences.database === 'postgresql') {
      packageJson.dependencies = {
        ...packageJson.dependencies,
        'pg': '^8.11.3'
      };
    }
  }

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
};

const initializeProject = async (projectPath, type, preferences) => {
  console.log(chalk.blue('📦 Installing dependencies...'));
  
  try {
    // Change to project directory
    process.chdir(projectPath);
    
    // Install dependencies
    execSync('npm install', { stdio: 'inherit' });

    // Initialize git repository
    try {
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  Git initialization skipped (git not available)'));
    }

  } catch (error) {
    console.error(chalk.red(`❌ Error installing dependencies: ${error.message}`));
    throw error;
  }
};

// CLI Commands
program
  .name('create-kislay-app')
  .description('CLI tool for scaffolding production-ready frontend and backend applications')
  .version('1.0.0');

program
  .command('frontend <project-name>')
  .description('Create a React + Vite frontend application')
  .action((projectName, options) => {
    createProject('frontend', projectName, options);
  });

program
  .command('backend <project-name>')
  .description('Create a Node.js + Express backend application')
  .action((projectName, options) => {
    createProject('backend', projectName, options);
  });

program
  .command('fullstack <project-name>')
  .description('Create a full-stack application (frontend + backend)')
  .action((projectName, options) => {
    console.log(chalk.yellow('🚧 Full-stack template coming soon!'));
    console.log(chalk.gray('For now, create frontend and backend separately.'));
    process.exit(0);
  });

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red('❌ Invalid command. See --help for available commands.'));
  process.exit(1);
});

// Parse command line arguments
program.parse(); 