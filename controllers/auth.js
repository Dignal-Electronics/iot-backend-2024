const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {

	const user = await User.findOne({ where: { username: req.body.username, active: true } });
	if (!user) {
		return res.status(401).send({ message: 'Acceso denegado' });
	}

	const isCorrectPassword = bcrypt.compareSync(req.body.password, user.password);
	if (!isCorrectPassword) {
		return res.status(401).send({ message: 'Acceso denegado' });
	}

	const token = jwt.sign({
		user_id: user.id
	}, process.env.JWT_KEY_USERS);

	return res.status(200).send({ message: 'Acceso concedido', data: { user, token } });
};

module.exports = { login };