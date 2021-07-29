require('../config/database');
const Weather = require('../db/models/Weather');
const fetch = require('node-fetch');
const apiKey = '0f500b7cdfb18a7410e0ba7628947a53';
const moment = require('moment');

module.exports = weatherRepository = {
    getCityByName: (cityName) => {
        try {
            return Weather.findOne({ city: cityName });
        } catch (error) {
            return error;
        }
    },
    getTempAPI: async (cityName) => {
        try {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=es&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const informacion = await response.json();
            return informacion.main.temp;
        } catch (error) {
            return error;
        }
    },
    updateWeather: (cityName, temp) => {
        try {
            return Weather.updateOne({city: cityName}, {
                temp: temp,
                lastDateTime: Date.now()
            });
        } catch (error) {
            return error;
        }
    },
    createWeather: (cityName, tempAPI) => {
        try {
            const newWeather = new Weather({
                city: cityName,
                temp: tempAPI,
                lastDateTime: Date.now()
            })

            return newWeather.save();
        } catch (error) {
            return error;
        }
    },
    diffMoment: (lastDateTime) => {
        try {
            const lastDateTimeHours = moment.utc(lastDateTime, 'DD-MM-YYYY HH:mm:ss');
            const dateNow = moment.utc(moment(), 'DD-MM-YYYY HH:mm:ss');
            
            return dateNow.diff(lastDateTimeHours, 'hours')
        } catch (error) {
            return error;
        }
    },
};
