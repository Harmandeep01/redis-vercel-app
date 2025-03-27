const Redis = require("ioredis");
const session = require("express-session");
const redisClient = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null, // Set if Redis has a password
  db: 0, // Select Redis DB
});

redisClient.on("connect", () => console.log("🟢 Redis Connected"));
redisClient.on("error", (err) => console.error("🔴 Redis Error:", err));

const redisStore = {
    client: redisClient,
    ttl: 86400, // 1 day
}



module.exports = {redisClient, redisStore};
