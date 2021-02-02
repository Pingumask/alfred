const Command = require("./command");

module.exports = class Ping extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!ping");
	}

	static action(message) {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! Le message a une latence de ${timeTaken}ms`);
	}
};
