const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect('mongodb+srv://fabricio:sosenha@cluster0-vjbdy.mongodb.net/dev-radar?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
 });

app.listen(3333);