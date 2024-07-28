require('dotenv').config();
global.functions = require('./functions');
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(process.env.API_PORT, () => {
	console.log(`Puerto API ${process.env.API_PORT}`);
});

const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
	cors: {
		origin: process.env.URL_ORIGIN
	}
});

io.on('connection', (socket) => {
	socket.on('prueba', () => {
		console.log('Conectado con el front');
	});
});

httpServer.listen(process.env.WEBSOCKET_PORT);

const mqtt = require('mqtt');
const mqttClient = mqtt.connect('http://localhost');
mqttClient.on('connect', () => {
	console.log('Conectado a mqtt');
});
