const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');

/* GET user profile page. */
// add route here
router.get('/', authHelpers.loginRequired, (req, res, next) => {
  res.render('user/index', {      // show user data page route
    user: req.user.dataValues  // passes in user data
  });
});

module.exports = router;
