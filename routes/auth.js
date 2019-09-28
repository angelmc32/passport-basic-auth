const express = require('express');
const router = express.Router();
const passport = require('../helpers/passport');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info = {}) => {
    console.log(err, user, info);
    const { message: error } = info;

    if ( error ) res.render('login', { error });
    req.login(user, err => {
      res.redirect('/');
    });
  })(req, res);
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
})

router.post('/signup', (req, res, next) => {
  const { password, email } = req.body;

  const bcryptSalt = 10;
  
  let error;

  if(!email || !password) {
    error = 'Please make sure to enter e-mail and password';
    return res.render('signup', { error });
  }
  if( req.body.password !== req.body['confirm-password'] ) {
    error = 'Please make sure to confirm the password correctly';
    return res.render('signup', { error });
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  User.findOne({email})
  .then( user => {
    if(user) {
      error = 'There is an user registered with that e-mail'
      return res.render('signup', error)
    }
    User.create({ email, password: hashPass })
    .then( user => {
      console.log('User created');
      res.redirect('/login');
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('login');
})

module.exports = router;