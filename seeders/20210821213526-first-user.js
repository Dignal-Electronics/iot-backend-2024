'use strict';
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/

		const rounds = 10;
		const hash = bcrypt.hashSync('admin', rounds);

		await queryInterface.bulkInsert('users', [{
			name: 'Admin',
			username: 'admin',
			password: hash,
			created_at: new Date(),
			updated_at: new Date()
		}], {});

		const user = await User.findByPk(1);

		const token = jwt.sign({
			user_id: user.id
		}, process.env.JWT_KEY); //ALGORITMO HS256

		user.token = token;
		await user.save();
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	}
};
