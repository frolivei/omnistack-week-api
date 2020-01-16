const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();

// minhas rotas
routes.get('/', (req, res) => {
    return res.send('Running...');
});
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

module.exports = routes;