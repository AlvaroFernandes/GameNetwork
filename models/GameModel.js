const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

const gameSchema = new Schema(
    {
        gameid: {
            type: Number,
            require: true
        },
    }
);

const Game = mongoose.model("games", gameSchema);

module.exports = Game;