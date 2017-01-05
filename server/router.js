const express = require('express'),
    _helloController = require('./controllers/_helloController');

module.exports = function(app) {
    const apiRoutes = express.Router();

    // http://localhost:3000/api/helloworld
    apiRoutes.get('/helloworld', _helloController.helloworld);

    app.use('/api', apiRoutes);
};