// Database configuration
let mongoose, Pool;

// MongoDB connection
const connectMongoDB = async () => {
  try {
    if (!mongoose) {
      mongoose = require('mongoose');
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

// PostgreSQL connection
const connectPostgreSQL = async () => {
  try {
    if (!Pool) {
      Pool = require('pg').Pool;
    }
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

    const client = await pool.connect();
    console.log('✅ PostgreSQL Connected');
    client.release();
    
    return pool;
  } catch (error) {
    console.error(`❌ PostgreSQL connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDB,
  connectPostgreSQL
}; 