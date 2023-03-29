const User = require('./models/user.model');

const user = new User({email: 'truly@truly', password: 'password'});
console.log(user.isValidPassword);