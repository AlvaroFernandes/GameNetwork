const router = require('express').Router();
const apiRoutes = require('./apiRoutes.js');

router.use("/", apiRoutes);

router.get("/",function (req, res) {
        res.json({test: "subroutes work"})
    });

module.exports = router;