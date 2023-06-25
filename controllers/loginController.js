const user = require('../models/userModel');

exports.getLogin = (req, res) => {
  res.render('pages/login', { title: 'Login', message: '' });
};

exports.postLogin = (req, res) => {
  const foundUser = user.findByUsername(req.body.username);

  if (foundUser && foundUser.password === req.body.password) {
    req.session.isLoggedIn = true;
    res.redirect('/dashboard');
  }
  else {
    res.render('pages/login', { title: 'Login', message: 'Invalid username or password' });
  }
};

exports.getDashboard = (req, res) => {
  if (req.session.isLoggedIn) {
    res.send('Welcome, you are logged in');
  }
  else {
    res.redirect('/login');
  }
};
