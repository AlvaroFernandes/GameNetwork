import axios from 'axios';

export default {
    getUser: () => {
        return axios.get("/user/");
    },
    postUserData: (newUserData) => {
        return axios.post("/user/newUser", newUserData);
    },
    postUserLogin: (loginInput) => {
        return axios.post("/user/checkLogin", loginInput);
    },
    postLogout: (logoutUser) => {
        return axios.post("/user/logout", logoutUser); 
    },
    postBio: (userBio) => {
        return axios.post("/user/bio/", userBio);
    },
    getBio: (userId) => {
        return axios.get("/user/bio/", userId);
    },
    getUserInfo: (userId) => {
        return axios.get("/user/userInfo/" + userId);
    },
    getHomeImg: () => {
        return axios.get("/game/home/");
    }, 
    getGames: () => {
        return axios.get("/game/search");
    },
    getGame: (gameId) =>{
        return axios.get('/game/gameInfo/' + gameId);
    },
    postUserGame: (userId, gameId) => {
        return axios.post("/game/addGame/", { userId , gameId})
    },
    postUserFriend: (userId,friendId) => {
        return axios.post("/user/addFriend/", { userId, friendId });
    },
    searchUser: () => {
        return axios.get("/user/userSearch");
    }
};