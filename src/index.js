const Discord = require("discord.js");
require("dotenv").config();

/** Mes commandes personalisée */
const Ping = require("./commands/Ping");
const Coinflip = require("./commands/Coinflip");
const Btc = require("./commands/Btc");
const Chess = require("./commands/Chess/Chess");
const Puzzle = require("./commands/Chess/Puzzle");
const Covid = require("./commands/Covid");

// Je créer un client discord.
const client = new Discord.Client();

/** Permet de souhaiter la bienvenue à un nouveau membre */
client.on("guildMemberAdd", (member) => {
	member
		.createDM()
		.then((channel) => {
			channel.send(
				`Hello ${member.displayName} bienvenue sur le Channel, fait comme chez toi !`
			);
		})
		.catch((err) => {
			console.error(err);
		});
});

// Connexion
client.on("message", (message) => {
	/** Ici, je liste les commandes disponibles */
	let commandUsed =
		Ping.parse(message) ||
		Coinflip.parse(message) ||
		Btc.parse(message) ||
		Chess.parse(message) ||
		Puzzle.parse(message) ||
		Covid.parse(message);
});

client.login(process.env.BOT_TOKEN);
