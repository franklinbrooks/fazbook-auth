const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

router.get('/register', authHelpers.loginRedirect, (req, res)=> { // register route for new user
  res.render('auth/register');
});

router.post('/register', (req, res, next)  => { // POST for new user data
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

router.get('/login', authHelpers.loginRedirect, (req, res)=> { // route to login page for existing user
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', { // POST for existing user login data
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

router.get('/logout', (req, res) => { // logout() then back to root
  req.logout();
  res.redirect('/');
});

module.exports = router;
