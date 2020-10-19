const router = require('express').Router();
const gameApi = require('../../controllers/gameApi');

router.route('/home')
    .get(gameApi.getImages);

module.exports = router;
