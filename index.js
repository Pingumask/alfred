// Je require discord.js
const Discord = require("discord.js");
// Et mes fonctions qui se trouve dans le fichier function.js
const commande = require("./function");
// Et mon fichier dotenv
require("dotenv").config();

/** Permet de faire des requete vers une API */
const axios = require("axios");

// Je créer un client discord.
const client = new Discord.Client();

// Création d'un préfixe pour comprendre la commande
const prefix = "!";

const API_COVID = "https://disease.sh/v3/covid-19/countries";
const API_CHESS = "https://api.chess.com/pub/player";

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
				`Pong! Le message a une latence de ${commande.ping(message)}ms.`
			);
			break;
		// Si c'est sum, tu envois les arguments en paramètres
		case "sum":
			message.reply(
				`La sommes des arguments vaut ${commande.sum(args)}!`
			);
			break;
		case "coinflip":
			message.reply(
				`Tu avais un dilemme et tu souhaite le résoudre avec pile ou face ? Voilà le résultat : ${commande.coinflip()}`
			);
			break;
		case "covid":
			axios
				.get(`${API_COVID}/${args}`)
				.then(function (response) {
					const data = response.data;
					// handle success

					message.reply(
						`les stats concernant le coronavirus en ${args} : \r\n Nombres de cas : ${data.cases} \r\n Nombres de morts : ${data.deaths} \r\n Nombres de guérisons : ${data.recovered}`
					);
				})
				.catch(function (error) {
					// handle error
					console.log(error);
					message.reply(
						`Désolé, je ne connais pas le pays. Essai de l'écrire autrement`
					);
				});
			break;
		case "chess":
			Promise.all([
				commande.getUserAccount(args),
				commande.getUserStats(args),
			]).then(function (results) {
				const acct = results[0].data;
				const stats = results[1].data;

				message.reply(
					`Pour le joueur ${acct.username} voici ses stats
					
					> Partie rapide.
- Gagnant : ${stats.chess_rapid.record.win}.
- Perdant : ${stats.chess_rapid.record.loss}.
- Null : ${stats.chess_rapid.record.draw}
					
					> Partie blitz. 
- Gagnant : ${stats.chess_blitz.record.win}.
- Perdant : ${stats.chess_blitz.record.loss}.
- Null : ${stats.chess_blitz.record.draw}`
				);
			});
			break;

		// Dans le reste des cas, tu indiques que tu connais pas la commande
		default:
			message.reply(
				"Il faut me donner un ordre que je connais !sum ou !ping !covid"
			);
	}
});

// Je me log avec un fichier dotenv.
client.login(process.env.BOT_TOKEN);
