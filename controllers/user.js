const passport = require('passport');
const db = require('../models');

module.exports = {
    userCreate: function (req, res) {
        console.log('userCreate')
        db.UserModel
            .create(req.body)
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => {
                res.status(422).json(err);
            });
    },
    login: function (req, res) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        passport.authenticate('local'),(req, res) => {
            console.log('logged in', req.user);
            var userInfo = {
                username: req.user.username
            };
            res.send(userInfo);
        }
    },
    userLoggedIn: function (req, res, next) {
        console.log('===== user!!======')
        console.log(req.user)
        if (req.user) {
            res.json({ user: req.user })
        } else {
            res.json({ user: null })
        };
    },
    userLoggedOut: function (req, res) {
        if (req.user) {
            req.logout()
            res.send({ msg: 'logging out' })
        } else {
            res.send({ msg: 'no user to log out' })
        };
    },
    updateBio: function (req, res) {
        console.log(req.body)
        db.UserModel
            .findByIdAndUpdate({ _id: req.user._id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getUserBio: function (req, res) {
        db.UserModel
            .findOne({ _id: req.user._id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    searchUser: function (req, res) {
        db.UserModel
            .find({})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getUserInfo: function (req, res) {
        console.log(req);
        db.UserModel
            .findOne({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
