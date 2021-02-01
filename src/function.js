const axios = require("axios");

exports.sum = (args) => {
	const numArgs = args.map((x) => parseFloat(x));
	const sum = numArgs.reduce((counter, x) => (counter += x));
	return sum;
};

exports.ping = (message) => {
	const timeTaken = Date.now() - message.createdTimestamp;
	return timeTaken;
};

exports.coinflip = () => {
	const coinflip = ["pile", "face"];
	const result = Math.floor(Math.random() * 2);
	return coinflip[result];
};

exports.getUserAccount = (args) => {
	return axios.get(`https://api.chess.com/pub/player/${args}`);
};
exports.getUserStats = (args) => {
	return axios.get(`https://api.chess.com/pub/player/${args}/stats`);
};

exports.puzzle = () => {
	return axios.get("https://api.chess.com/pub/puzzle/random");
};
