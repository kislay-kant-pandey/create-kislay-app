const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  const healthCheck = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    memory: process.memoryUsage(),
    cpu: process.cpuUsage()
  };

  res.status(200).json(healthCheck);
});

// Detailed health check
router.get('/detailed', (req, res) => {
  const detailedHealth = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    memory: {
      rss: `${Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100} MB`,
      heapTotal: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100} MB`,
      heapUsed: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB`,
      external: `${Math.round(process.memoryUsage().external / 1024 / 1024 * 100) / 100} MB`
    },
    cpu: process.cpuUsage(),
    platform: process.platform,
    nodeVersion: process.version,
    pid: process.pid
  };

  res.status(200).json(detailedHealth);
});

module.exports = router; 