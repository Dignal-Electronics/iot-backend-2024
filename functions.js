const winston = require('winston');
const logger = winston.createLogger({
	transports: [
		new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
	],
});

const createErrorLog = (error) => {
	logger.error(`${new Date()} ${error.message}`);
};

const createInfoLog = (info) => {
	logger.info(`${new Date()} ${info}`);
}

const getRandomString = () => {
	const chain = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let string = "";
	for (let i = 0; i < 10; i++) {
		string += chain[Math.floor(Math.random() * (chain.length - 1))];
	}
	return string;
};

module.exports = { createErrorLog, createInfoLog, getRandomString };