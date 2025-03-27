const { DataTypes, fn } = require('sequelize');
const sequelize = require('../config/database');
const SubCategory = require('./subCategory');

const Expense = sequelize.define('Expense', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    sub_category_id: { type: DataTypes.INTEGER, references: { model: SubCategory, key: 'id' } },
    notes: {type: DataTypes.TEXT, allowNull: true},
}, { timestamps: false, tableName: 'expenses' });

SubCategory.hasMany(Expense, { foreignKey: 'sub_category_id' });
Expense.belongsTo(SubCategory, { foreignKey: 'sub_category_id' });

module.exports = Expense;
