const Discord = require("discord.js");
const commande = require("./function");
require("dotenv").config();

/** Permet de faire des requete vers une API */
const axios = require("axios");

// Je créer un client discord.
const client = new Discord.Client();

// Création d'un préfixe pour comprendre la commande
const prefix = "!";

const API_COVID = "https://disease.sh/v3/covid-19/countries";

// Connexion
client.on("message", function (message) {
	// Si bot, return
	if (message.author.bot) return;
	// si le message ne commence pas par le prefix, tu return.
	if (!message.content.startsWith(prefix)) return;

	// Je slice mon préfix
	const commandBody = message.content.slice(prefix.length);
	// Je récupère les arguments que je split pour les séparées et avoir un array
	const args = commandBody.split(" ");
	// je récupère la commande que je met en miniscule
	const command = args.shift().toLowerCase();

	// Dans un switch
	switch (command) {
		case "ping":
			message.reply(
				`Pong! Le message a une latence de ${commande.ping(message)}ms.`
			);
			break;
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
		case "btc":
			axios
				.get(`https://blockchain.info/ticker`)
				.then((response) => {
					const data = response.data;
					console.log(data.USD);
					message.channel.send(
						`Le prix actuel du BTC (prix du marché différé de 15 min) est de ${data.USD.symbol}${data.USD["15m"]} ou ${data.EUR["15m"]}${data.EUR.symbol}`
					);
				})
				.catch();
			break;
		case "covid":
			axios
				.get(`${API_COVID}/${args}`)
				.then(function (response) {
					const data = response.data;
					// handle success
					message.channel.send(
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
		case "puzzle":
			Promise.all([commande.puzzle()]).then(function (results) {
				const puzzle = results[0].data;
				// Create the attachment using MessageAttachment
				const attachment = new Discord.MessageAttachment(puzzle.image);
				message.channel.send(
					`Le puzzle du jour : ${puzzle.title}
Si vous souhaitez le faire c'est par [là](${puzzle.url})`,
					attachment
				);
			});
			break;
		case "chess":
			Promise.all([
				commande.getUserAccount(args),
				commande.getUserStats(args),
			])
				.then(function (results) {
					const acct = results[0].data;
					const stats = results[1].data;

					message.channel.send(
						`Pour le joueur - ${acct.username} voici ses stats

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
				.catch((err) => {
					message.reply(
						`Désolé, je ne connais pas le joueur ${args}`
					);
				});
			break;

		// Par défaut
		default:
			message.reply(
				"Il faut me donner un ordre que je connais , \r\n n'hésite pas à voir le channel #📑-commande"
			);
	}
});

client.login(process.env.BOT_TOKEN);
