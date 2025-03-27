const express = require('express');
const { getCategories, getSubCategories } = require('../controllers/categoryController');

const router = express.Router();
router.get('/categories', getCategories);
router.get('/sub-categories', getSubCategories);

module.exports = router;
