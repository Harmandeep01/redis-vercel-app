var express = require("express");
var router = express.Router();
const User = require("../models/User");
const authenticated = require('../middleware/auth.middleware');
// const Language = require("../models/Language");


//Route for registering a user
router.post("/register", async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust if needed
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight request
  }

  const { username, password } = req.body;

  try {
    console.log("Registering user:", username);

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create and save new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Convert user object and remove password before sending response
    const user = newUser.toObject();
    delete user.password;

    // Attach user session
    req.session.user = user;

    // Send a JSON response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });

  } catch (err) { 
    console.error("Error during registration:", err);

    // Send JSON error response
    return res.status(500).json({ success: false, message: "Internal Server Error" });
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
