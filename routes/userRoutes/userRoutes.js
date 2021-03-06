const router = require('express').Router();
const userController = require('../../controllers/user');
const passport = require('passport');

router.route("/")
    .get(userController.userLoggedIn);

router.route("/newUser")
    .post(userController.userCreate);

router.route("/checkLogin")
    .post(
        // userController.login
        function (req, res, next) {
            next()
        },
        passport.authenticate('local'),
        (req, res) => {
            var userInfo = {
                username: req.user.username
            };
            res.send(userInfo);
        }
        );

router.route("/logout")
    .post(userController.userLoggedOut);

router.route("/bio")
    .post(userController.updateBio)
    .get(userController.getUserBio);

router.route("/userSearch")
    .get(userController.searchUser);

router.route("/userInfo/:id")
    .get(userController.getUserInfo);

router.route('/addFriend')
    .post(userController.addFriends);

module.exports = router;