const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { initAdmin } = require('./controllers/authController');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
initAdmin();

app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
