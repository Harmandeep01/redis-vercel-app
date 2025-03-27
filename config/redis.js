const Redis = require("ioredis");

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null, // Set if Redis has a password
  db: 0, // Select Redis DB
});

redisClient.on("connect", () => console.log("🟢 Redis Connected"));
redisClient.on("error", (err) => console.error("🔴 Redis Error:", err));

module.exports = redisClient;
