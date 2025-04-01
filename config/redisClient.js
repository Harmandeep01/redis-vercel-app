const Redis = require("ioredis");
require("dotenv").config();  // Load environment variables from .env file

// Use Upstash Redis URL and password directly
const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

module.exports = redisClient;
