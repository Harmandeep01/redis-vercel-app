var express = require('express');
var router = express.Router();
const path = require('path');
const root = path.join(__dirname, '../public');

//check if user is already logged in
router.get('/', (req, res) => {
  if(!req.session.user){
    return res.redirect('/login');
  }else{
    res.sendFile('index.html', { root });
  }
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
  if(req.session.user){
    return res.redirect('/')
  }
  res.sendFile('login.html', { root: 'public' });
});

//get the register page
router.get('/register', (req, res) => {
  if(req.session.user){
    return res.redirect('/');
  }
  res.sendFile('register.html', { root: 'public' });
});

module.exports = router;
