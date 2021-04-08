'use strict'

const express = require('express');
require('./db');
const User = require('./user.model');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// insert the data to mongodb
app.post('/api/v1/users', async (req, res, next) => {
    try {

        const doc = await User.create(req.body);
        res.json(doc);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

// retrive the data from to mongodb
app.get('/api/v1/users', async (req, res, next) => {
    try {

        const results = await User.find({});
        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

// update the data in mongodb
app.put('/api/v1/users/:id', async (req, res, next) => {
    try {

        const results = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(results);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

// delete the data in mongodb
app.delete('/api/v1/users/:id', async (req, res, next) => {
    try {

        const results = await User.findByIdAndRemove(req.params.id);
        res.json({message:results.name + 'account deleted'});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server listening on the port ${PORT}`)
})