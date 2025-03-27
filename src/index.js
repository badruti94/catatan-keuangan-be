require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

sequelize.sync().then(() => console.log('Database Connected'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
