const axios = require('axios');
const apiConfig = require('../apiConfig')

const BASE_URL = 'https://rapidapi.p.rapidapi.com/games';

module.exports = {
	getImages: function (req, res){
		axios({
			method: "GET",
			url: BASE_URL,
			headers: {
				"x-rapidapi-host": apiConfig.host,
				"x-rapidapi-key": apiConfig.key,

				"useQueryString": true
			}
		}).then(function(data){
			console.log(data.data.results);
			const imgArray = [];

			for(let i = 0; i < 6; i++){
				const game = {
					// name: data.data.results[i].name,
					img: data.data.results[i].background_image
				};
				imgArray.push(game);
			}
			res.json(imgArray);
		}).catch(function(error){
			console.log(error);
			res.status(500).json({error: error});
		})
	}
}
