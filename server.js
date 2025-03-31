const app = require('./app');
const connectRedis = require('connect-redis')
module.exports = app; // ✅ Export app instead of listening