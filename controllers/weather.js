const repository = require('../repository/weather');

module.exports = {
    getWeatherByCity: async (req, res) => {
        try {
            const cityName = req.params.city;
            const citySearch = await repository.getCityByName(cityName);
            
            if (!citySearch){
                const tempAPI = await repository.getTempAPI(cityName);
                await repository.createWeather(cityName, tempAPI);

                return res.status(200).json({
                    city: cityName,
                    temp: tempAPI
                });
            }else{
                const diffHours = repository.diffMoment(citySearch.lastDateTime);

                if (diffHours < 1){
                    return res.status(200).json({
                        city: cityName,
                        temp: citySearch.temp
                    });
                }else{
                    const tempCityAPI = await repository.getTempAPI(cityName);
                    await repository.updateWeather(cityName, tempCityAPI);

                    return res.status(200).json({
                        city: cityName,
                        temp: tempCityAPI
                    });
                }
            }

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
};
