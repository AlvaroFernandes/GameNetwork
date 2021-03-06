const axios = require('axios');
const db = require('../models');

const BASE_URL = 'https://rapidapi.p.rapidapi.com/games';
const API = {
	method: "GET",
	url: BASE_URL,
	headers: {
		"x-rapidapi-host": process.env.API_HOST,
		"x-rapidapi-key": process.env.API_KEY,

		"useQueryString": true
	}
};

module.exports = {
	getImages: function (req, res){
		axios(API)
		.then(function(data){
			const imgArray = [];
			for(let i = 0; i < 15; i++){
				const game = {
					img: data.data.results[i].background_image
				};
				imgArray.push(game);
			}
			res.json(imgArray);
		})
		.catch(function(error){
			res.status(500).json({error: error});
		})
	},
	getGames: function(req, res){
		axios(API)
		.then(function(data){
			const games = data.data.results;
			const listGames = [];
			for(let i = 0; i < games.length; i++){
				const game = {
					id: games[i].id,
					name: games[i].name,
					backgroundImage: games[i].background_image,
				};
				listGames.push(game);
			}
			res.json(listGames);
		})
		.catch(function(error){
			res.status(500).json({error: error});

		})
	},
	getGame: function (req, res){
		const id = req.params.id;
		const url = "https://rawg-video-games-database.p.rapidapi.com/games/" + id;
		axios({
			"method": "GET",
    		"url": url,
    		"headers":{
				"x-rapidapi-host": process.env.API_HOST,
				"x-rapidapi-key": process.env.API_KEY,
					}
		}).then(function(data){
			const gameInfo = data.data;
			const game = {
				id: gameInfo.id,
				name: gameInfo.name,
				description: gameInfo.description,
				img: gameInfo.background_image,
				dev: gameInfo.developers,
				genres: gameInfo.genres,
				video: gameInfo.clip,
				release: gameInfo.release,
				platforms: gameInfo.platforms,
				website: gameInfo.website,
			};
			res.json(game);
		}).catch(function(error){
			res.status(500).json({error: error});

		})
	},
	addGame: function (req, res) {
		const userID = req.body.userId.userId;
		const gameID = req.body.userId.gameId;
		db.UserModel
			.updateOne({ _id: userID}, { '$push':{
				'games': gameID,
			} })
			.then(dbModel => {
				res.json(dbModel)
			})
			.catch(err => {
				res.status(422).json(err)
			});
	}
}
