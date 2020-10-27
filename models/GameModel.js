const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("dotenv").config();

const gameSchema = new Schema(
    {
        gameid: {
            type: Number,
            require: true
        },
        user: { type: Schema.Types.ObjectId, ref: "User"}
    }
);

const Game = mongoose.model("game", gameSchema);

module.exports = Game;