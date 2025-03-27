# 📌 Redis-Based Best Languages Project
🚀 Purpose

- This project is built to demonstrate how Redis can be used for caching data to improve performance while fetching and storing information efficiently.

## 📖 Overview
We created a Best Languages database where users can:
✅ Register/Login securely
✅ Select their favorite programming languages dynamically (with logos)
✅ Fetch stored data quickly using Redis caching
✅ Logout securely
✅ Ensure authentication using middleware to protect routes

* ⚡ Important: If a user is not in an active session, they cannot log in or access their favorite languages. Authentication is handled via middleware for security.

### 🛠️ Tech Stack
- Node.js (Backend)

- Express.js (Web framework)

- MongoDB (Database)

- Redis (For caching sessions & data)

- JWT & Session-based Authentication

- Bcrypt (Password Hashing)

- OAuth (Google & Facebook login) (if applicable)

- Rate Limiting (to prevent abuse)

## 🚀 Setup & Installation
- 1️⃣ Clone the repository

```
git clone https://github.com/Harmandeep01/Redis-App.git
```
2️⃣ Install dependencies

```
npm install
```

3️⃣ Setup environment variables
Create a .env file and add:

```
MONGO_URI=mongodb://127.0.0.1:27017/db_name
SESSION_SECRET=your_secret_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
4️⃣ Start the Redis server (if not running already)
```
redis-server
```
5️⃣ Run the application
```
npm start
```
or
```
node app.js
```

🛠️ API Endpoints
🔑 Authentication
```
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	    User login & session creation
```
GET	/logout	Logout & clear session
📌 Favorite Languages
```
Method	Endpoint	Description
GET	   /languages	    Get all languages from DB
POST   /favourite	Select favorite language
GET	   /favourite	    Get user’s favorite language
```
***Note: Protected routes require an authenticated session.***

>📝 Features

>✔ User Authentication & Sessions (JWT & Redis)

>✔ Role-based Access Control (Middleware authentication)

>✔ Caching with Redis for fast response times

>✔ Rate Limiting to prevent API abuse

>✔ Dynamic Favorite Language Selection with Logos

📌 Contributing
Want to improve this project? Feel free to fork it and submit a PR! 🚀


### Links
[LinkedIn](https://www.linkedin.com/in/harmandeep01/)

[GitHub](https://github.com/Harmandeep01)

### Badges
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE.txt)

