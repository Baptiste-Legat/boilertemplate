const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});