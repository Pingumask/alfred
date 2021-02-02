const Command = require("../command");

module.exports = class Recree extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!recree");
	}

	static action(message) {
		/** init la date */
		let dateStart = new Date();
		let dateEnd;
		const tenMinutes = 1000 * 60 * 10;
		/** Pour le test */
		// const fiveSeconds = 1000 * 5;

		/** Get le role pour les pings */
		let roleName = message.guild.roles.cache.find(
			(role) => role.name === "Etudiants"
		);

		/** Je gère la date > 60 min */
		if (dateStart.getMinutes() + 10 >= 60) {
			dateEnd = `0${dateStart.getMinutes() + 10 - 60}`;
		} else {
			dateEnd = dateStart.getMinutes() + 10;
		}

		/** J'envoi le 1er message */
		message.channel.send(`
        🚀\r\n🚀🚀\r\n🚀🚀🚀\r\nC'est la récré les ami(e)s ! Il est ${dateStart.getHours()}h${
			(dateStart.getMinutes() < 10 ? "0" : "") + dateStart.getMinutes()
		}, \r\n On revient à ${dateEnd}\r\n🚀🚀🚀\r\n🚀🚀\r\n🚀`);

		/** Au bout de 10 minutes, je renvoi un message */
		setTimeout(() => {
			message.channel.send(`
        🚀\r\n🚀🚀\r\n🚀🚀🚀\r\n Hey ${roleName}, la récré est fini ! \r\n🚀🚀🚀\r\n🚀🚀\r\n🚀`);
		}, tenMinutes);

		/** Je supprime mon message pour ne pas spam */
		message
			.delete()
			.then((msg) =>
				console.log(`Deleted message from ${msg.author.username}`)
			)
			.catch(console.error);
	}
};
