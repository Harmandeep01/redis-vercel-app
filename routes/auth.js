var express = require("express");
var router = express.Router();
const User = require("../models/User");
const authenticated = require('../middleware/auth.middleware');
// const Language = require("../models/Language");


//Route for registering a user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("🔹 Registering user:", username);

    console.log("🔹 Checking existing user...");
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("⚠️ User already exists.");
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("🔹 Creating new user...");
    const newUser = new User({ username, password });

    console.log("🔹 Saving new user...");
    await newUser.save();

    console.log("🔹 Removing password from response...");
    const user = newUser.toObject();
    delete user.password;

    console.log("🔹 Storing session...");
    req.session.user = user; // Potential Redis issue

    console.log("✅ Registration successful!");
    res.status(201).json({ message: "User registered successfully", user });

  } catch (err) {
    console.error("❌ ERROR:", err.message);
    res.status(500).send("Internal Server Error!");
  }
});


//Route for logging in a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.findOne({username});
  if (!existingUser) {
    return res.status(400).json({
      message: "User doesn't exists",
    });
  }else if(!existingUser.comparePassword(password)){
    return res.status(400).json({ message : 'Invalid Credentials'})
  }
  const user = existingUser.toObject();
  delete user.password;

  req.session.user = user;
  res.status(200).json({
    user
  });
});

router.get('/me', authenticated, async (req, res) => {
  const {username} = req.session.user;
  const user = await User.findOne({username}, {password : 0});
  res.status(200).json({
    user
  })
})


router.get('/logout', (req, res) => { 
  req.session.destroy( (err) => {
    if(err) {return res.status(400).json({
      message : err.message
    })
  }
  res.redirect('/login')
  })
})

module.exports = router;
