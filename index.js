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