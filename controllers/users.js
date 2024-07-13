const jwt = require('jsonwebtoken');
const validator = require('validatorjs');
const db = require('../models');
const User = db.User;
validator.useLang('es');

const index = async (req, res) => {
	const users = await User.findAll();
	return res.status(200).send({ data: users });
};

const create = async (req, res) => {

	const transaction = await db.sequelize.transaction();
	try {
		const rules = {
			name: 'required',
			username: 'required',
			password: 'required'
		};

		const validation = new validator(req.body, rules);
		validation.setAttributeNames({ name: 'nombre', username: 'usuario', password: 'contraseña' });

		if (validation.fails()) {
			return res.status(422).send(validation.errors);
		}

		const bcrypt = require('bcrypt');
		const rounds = 10;
		const hash = bcrypt.hashSync(req.body.password, rounds);

		const user = await User.create({
			name: req.body.name,
			username: req.body.username,
			password: hash
		}, { transaction });

		const token = jwt.sign({
			user_id: user.id
		}, process.env.JWT_KEY); //ALGORITMO HS256

		user.token = token;
		await user.save({ transaction });

		await transaction.commit();

		return res.status(201).send({ message: 'Usuario creado' });

	} catch (err) {
		console.log(err);
		await transaction.rollback();
		functions.createErrorLog(err);
		return res.status(500).send({ data: [], message: null });
	}
};

const update = async (req, res) => {
	const transaction = await db.sequelize.transaction();
	try {

		if (typeof req.body.active == 'undefined') {
			const rules = {
				name: 'required',
				username: 'required'
			};

			const validation = new validator(req.body, rules);
			validation.setAttributeNames({ name: 'nombre', username: 'usuario' });

			if (validation.fails()) {
				return res.status(422).send(validation.errors);
			}
		}

		const user = await User.findByPk(req.params.id);

		if (req.body.password) {
			const bcrypt = require('bcrypt');
			const rounds = 10;
			const hash = bcrypt.hashSync(req.body.password, rounds);
			user.password = hash;
			await user.save({ transaction });
		}

		await user.update(req.body, { fields: ['name', 'username', 'active'] }, { transaction });
		await transaction.commit();

		return res.status(200).send({ message: 'Usuario actualizado' });

	} catch (err) {
		console.log(err);
		await transaction.rollback();
		functions.createErrorLog(err);
		return res.status(500).send({ data: [], message: null });
	}
};

module.exports = { index, create, update };