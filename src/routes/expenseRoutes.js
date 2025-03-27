const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expenseController');

const router = express.Router();
router.post('/expenses', addExpense);
router.get('/expenses', getExpenses);

module.exports = router;
