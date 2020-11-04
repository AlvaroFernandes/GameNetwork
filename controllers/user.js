const passport = require('passport');
const db = require('../models');

module.exports = {
    userCreate: function (req, res) {
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
        passport.authenticate('local'),(req, res) => {
            var userInfo = {
                username: req.user.username
            };
            res.send(userInfo);
        }
    },
    userLoggedIn: function (req, res, next) {
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
        db.UserModel
            .findOne({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    addFriends: function (req, res) {
        const userID = req.body.userId.userId;
		const friendId = req.body.userId.friendId;
		db.UserModel
			.updateOne({ _id: userID}, { '$push':{
				'friends': friendId,
			} })
			.then(dbModel => {
				res.json(dbModel)
			})
			.catch(err => {
				res.status(422).json(err)
			});
    }
};
