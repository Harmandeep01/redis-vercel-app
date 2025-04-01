// redisClient.js
const Redis = require("ioredis");

const redisClient = new Redis({
  host: "127.0.0.1", // Redis running locally
  port: 6379,        // Default Redis port
});

redisClient.on("connect", () => console.log("✅ Redis Connected"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

module.exports = redisClient;