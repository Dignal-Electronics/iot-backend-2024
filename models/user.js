'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class user extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
		toJSON() {
			const attributes = Object.assign({}, this.get());
			delete attributes.password;
			return attributes;
		}
	};
	user.init({
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		password: DataTypes.STRING,
		active: DataTypes.BOOLEAN,
		token: DataTypes.STRING
	}, {
		sequelize,
		modelName: 'User',
		tableName: 'users',
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	});
	return user;
};