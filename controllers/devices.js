const validator = require('validatorjs');
const db = require('../models');
const Device = db.Device;
validator.useLang('es');

const index = async (req, res) => {
	const devices = await Device.findAll({ where: { user_id: req.user.id } });
	return res.status(200).send({ data: devices });
};

const create = async (req, res) => {

	const transaction = await db.sequelize.transaction();
	try {
		const rules = {
			name: 'required'
		};

		const validation = new validator(req.body, rules);
		validation.setAttributeNames({ name: 'nombre' });

		if (validation.fails()) {
			return res.status(422).send(validation.errors);
		}

		await Device.create({
			name: req.body.name,
			key: functions.getRandomString(),
			user_id: req.user.id
		}, { transaction });

		await transaction.commit();

		return res.status(201).send({ message: 'Dispositivo creado' });

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
			};

			const validation = new validator(req.body, rules);
			validation.setAttributeNames({ name: 'nombre' });

			if (validation.fails()) {
				return res.status(422).send(validation.errors);
			}
		}

		const device = await Device.findByPk(req.params.id);
		await device.update(req.body, {}, { transaction });
		await transaction.commit();

		return res.status(200).send({ message: 'Dispositivo actualizado' });

	} catch (err) {
		console.log(err);
		await transaction.rollback();
		functions.createErrorLog(err);
		return res.status(500).send({ data: [], message: null });
	}
};

module.exports = { index, create, update };