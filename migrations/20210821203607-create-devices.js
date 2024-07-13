'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('devices', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: 'users'
					},
					key: 'id'
				}
			},
			name: {
				type: Sequelize.STRING
			},
			key: {
				type: Sequelize.STRING
			},
			active: {
				type: Sequelize.BOOLEAN,
				defaultValue: 1
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('devices');
	}
};