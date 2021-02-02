const Command = require("./command");

module.exports = class Coinflip extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!coinflip");
	}

	static action(message) {
		const coinflip = ["pile", "face"];
		const result = Math.floor(Math.random() * 2);
		message.reply(
			`Tu avais un dilemme et tu souhaite le résoudre avec pile ou face ? Voilà le résultat : ${coinflip[result]}`
		);
	}
};
