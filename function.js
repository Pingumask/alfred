exports.sum = function (args) {
	const numArgs = args.map((x) => parseFloat(x));
	const sum = numArgs.reduce((counter, x) => (counter += x));
	return sum;
};

exports.ping = (message) => {
	const timeTaken = Date.now() - message.createdTimestamp;
	return timeTaken;
};
