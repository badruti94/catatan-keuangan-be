const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const SubCategory = sequelize.define('SubCategory', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Category, key: 'id' } }
}, { timestamps: false, tableName: 'sub_categories' });

Category.hasMany(SubCategory, { foreignKey: 'category_id' });
SubCategory.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = SubCategory;
