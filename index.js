const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = 3008;

dotenv.config();

// Mongo connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coddek')
    .then(db => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Middlewares
const cors = require('cors');
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('uploads'));

app.listen(PORT, () => console.log(`Server ready on port:  ${PORT}`));

// Routes
const routerApi = require('./routes/index');
routerApi(app);