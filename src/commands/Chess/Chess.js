const Command = require("../command");
const axios = require("axios");

getUserAccount = (args) => {
	return axios.get(`https://api.chess.com/pub/player/${args}`);
};
getUserStats = (args) => {
	return axios.get(`https://api.chess.com/pub/player/${args}/stats`);
};

module.exports = class Btc extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!chess");
	}

	static action(message) {
		const args = message.content.split(" ");
		args.shift().toLowerCase();
		

		Promise.all([getUserAccount(args), getUserStats(args)])
			.then(function (results) {
				const acct = results[0].data;
				const stats = results[1].data;

				message.channel.send(
					`Pour le joueur **${acct.username}** voici ses stats

> Partie rapide.
- Gagnant : ${stats.chess_rapid.record.win}.
- Perdant : ${stats.chess_rapid.record.loss}.
- Null : ${stats.chess_rapid.record.draw}

> Partie blitz. 
- Gagnant : ${stats.chess_blitz.record.win}.
- Perdant : ${stats.chess_blitz.record.loss}.
- Null : ${stats.chess_blitz.record.draw}`
				);
			})
			.catch(() => {
				message.reply(`Désolé, je ne connais pas le joueur ${args}`);
			});
	}
};
