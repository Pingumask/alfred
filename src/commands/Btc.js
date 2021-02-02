const Command = require("./command");
const axios = require("axios");

module.exports = class Btc extends (
	Command
) {
	static match(message) {
		return message.content.startsWith("!btc");
	}

	static action(message) {
		axios
			.get(`https://blockchain.info/ticker`)
			.then((response) => {
				const data = response.data;
				message.channel.send(
					`Le prix actuel du BTC (prix du marché différé de 15 min) est de ${data.USD.symbol}${data.USD["15m"]} soit ${data.EUR["15m"]}${data.EUR.symbol}`
				);
			})
			.catch((err) => {
				console.error(err);
			});
	}
};
