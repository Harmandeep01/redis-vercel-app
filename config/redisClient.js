const Redis = require("ioredis");
require("dotenv").config();  // Load environment variables

// Create a Redis client using Upstash URL
const redisClient = new Redis(process.env.REDIS_URL, {
  tls: { rejectUnauthorized: false }, // Required for Upstash secure connection
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry with delay
});

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

module.exports = redisClient;