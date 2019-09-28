const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.serializeUser( (user, cb) => {
  cb(null, user._id);
})

passport.deserializeUser( (id, cb) => {
  User.findById(id)
  .then( user => {
    cb(null, user);
  })
  .catch( error => cb(error) );
});

passport.use( new LocalStrategy( 
  {
    usernameField: "email"  // Change the strategy of authentication from default username to custom: email
  },
  (email, password, next) => {
  User.findOne({ email })
  .then( user => {
    if ( !user ) return next(null, false, { message: 'Incorrect email' });

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if ( !isValidPassword ) return next(null, false, { message: 'Incorrect password' })

    return next(null, user);
  })
  .catch( error => next(error) );
}))

module.exports = passport;