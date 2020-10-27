const router = require('express').Router();
const gameApi = require('../../controllers/gameApi');

router.route('/home')
    .get(gameApi.getImages);
router.route('/search')
    .get(gameApi.getGames);
router.route('/gameInfo/:id')
    .get(gameApi.getGame);
router.route('/addGame')
    .post(gameApi.addGame);
module.exports = router;
