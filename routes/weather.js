const express = require('express');
const router = express.Router();
const controller = require('../controllers/weather');

router.post('/:city', controller.getWeatherByCity);

module.exports = router;