// Dependency List
const path = require('path');
const router = require('express').Router();

// Subroutes 
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

router.use("/user", userRoutes);
router.use("/game", apiRoutes);

router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = router;