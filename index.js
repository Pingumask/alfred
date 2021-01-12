// Je require discord.js
const Discord = require("discord.js");
const commande = require("./function");
// Et mon fichier dotenv
require("dotenv").config();

// Je créer un client discord.
const client = new Discord.Client();

// Création d'un préfixe pour comprendre la commande
const prefix = "!";

// Connexion
client.on("message", function (message) {
	// Si bot, return
	if (message.author.bot) return;
	// si le message ne commence pas par le prefix, tu return.
	if (!message.content.startsWith(prefix)) return;

	// Je slice depuis mon préfix
	const commandBody = message.content.slice(prefix.length);
	// Je récupère la commande
	const args = commandBody.split(" ");

	const command = args.shift().toLowerCase();

	switch (command) {
		case "ping":
			message.reply(
				`Pong! This message had a latency of ${commande.ping(
					message
				)}ms.`
			);
			break;
		case "sum":
			message.reply(
				`The sum of all the arguments you provided is ${commande.sum(
					args
				)}!`
			);
			break;
		default:
			message.reply("Il faut me donner un ordre que je connais");
	}
});

// Je me log avec un fichier dotenv.
client.login(process.env.BOT_TOKEN);
