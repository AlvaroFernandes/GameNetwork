const { UserModel } = require('../models');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy(
    function(username, password, done) {
        UserModel.findOne({ username: username }, (err, user) => {
            console.log(username);
            console.log(user);
            if (err) {
                return done(err)
            };
            if (err) {
                return done(null, false, { message: "Incorrect username" })
            };
            if (!user.checkPassword(password)) {
                return done(null, false, { message: "Incorrect password" })
            };
            return done(null, user)
        })
    }
);

module.exports = strategy;