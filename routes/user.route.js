const router = require('express').Router();

router.get('/profile', async (req, res, next) => {
  // console.log(req.user);
  const person = req.user;
  res.render('profile', { person });
  // res.send('profile')
});

module.exports = router;