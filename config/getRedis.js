require('dotenv').config()
const { createClient } = require('redis');

let redisClient;

async function getRedisClient() {
  if (!redisClient || !redisClient.isOpen) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
      password: process.env.REDIS_TOKEN,
      socket: { tls: true }
    });

    redisClient.on('error', (err) => console.error('Redis Error:', err));

    await redisClient.connect();
    console.log('✅ Connected to Redis!');
  }
  return redisClient;
}

module.exports = getRedisClient;
