// Dependency List
const path = require('path');
const router = require('express').Router();

// Subroutes 
const userRoutes = require('./userRoutes');
const apiRoutes = require('./apiRoutes');

router.use("/user", userRoutes);
router.use("/game", apiRoutes);


module.exports = router;