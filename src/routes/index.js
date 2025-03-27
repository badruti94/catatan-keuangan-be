const express = require('express');
const categoryRoutes = require('./categoryRoutes');
const expenseRoutes = require('./expenseRoutes');
const statRoutes = require('./statRoutes');
const authRoutes = require('./authRoutes');
const authMIddleware = require('../middlewares/authMIddleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/', authMIddleware, categoryRoutes);
router.use('/', authMIddleware, expenseRoutes);
router.use('/', authMIddleware, statRoutes);

module.exports = router;