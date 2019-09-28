const express = require('express');
const router  = express.Router();

const isAuth = (req, res, next) => {
  //console.log(req.user);
  //console.log(req.isAuthenticated())
if (req.isAuthenticated()) return next();
let error = 'Please log in'
return res.render('login', {error});

}

/* GET home page */
router.get('/', isAuth, (req, res, next) => {
  const { user } = req;
  res.render('index', { user });
});


module.exports = router;
