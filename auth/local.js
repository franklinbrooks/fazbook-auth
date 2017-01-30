const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

init();

passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  models.User.findAll({  // using serializer
    where: {
      username
    }
  })
  .then((user) => {
    if (user[0] === undefined) { // if no user logged in, end Promise
      return done(null, false);
    }
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) { // if passwords do not match, end Promise
      return done(null, false);
    } else {
      return done(null, user[0].dataValues); // log in with user's data
    }
  })
  .catch((err) => { return done(err); });  // if Promise errors out
}));

module.exports = passport;
