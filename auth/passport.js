const passport = require('passport');
const models = require('../db/models/index');

module.exports = () => {
  passport.serializeUser((user, done) => { // serialize data from JSON to session memory
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => { // deserialize from session memory to JSON
    models.User.findById(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });
};
