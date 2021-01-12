// Je require discord.js
const Discord = require("discord.js");
// Et mes fonctions qui se trouve dans le fichier function.js
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

	// Je slice mon préfix
	const commandBody = message.content.slice(prefix.length);
	// Je récupère les arguments que je split pour les séparer et avoir un array
	const args = commandBody.split(" ");
	// je récupère la commande que je met en miniscule
	const command = args.shift().toLowerCase();

	// Dans un switch
	switch (command) {
		// Si la command est ping alors execute la fonction commande.ping en passant le paramètre message
		case "ping":
			message.reply(
				`Pong! This message had a latency of ${commande.ping(
					message
				)}ms.`
			);
			break;
		// Si c'est sum, tu envois les arguments en paramètres
		case "sum":
			message.reply(
				`The sum of all the arguments you provided is ${commande.sum(
					args
				)}!`
			);
			break;
		// Dans le reste des cas, tu indiques que tu connais pas la commande
		default:
			message.reply(
				"Il faut me donner un ordre que je connais !sum ou !ping"
			);
	}
});

// Je me log avec un fichier dotenv.
client.login(process.env.BOT_TOKEN);
