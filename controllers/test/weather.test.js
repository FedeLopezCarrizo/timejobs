const chai = require('chai');
const sinon = require('sinon');
const weatherController = require('../weather');
const weatherRepository = require('../../repository/weather');
const moment = require('moment');

describe('Weather By City', async () => {
    const mockResponse = () => {
        const res = {};
        res.statusCode = 200;
        res.status = (status) => {
            res.statusCode = status;
            return res;
        };

        res.jsonReturned = {};
        res.json = (json) => {
            res.jsonReturned = json;
            return res
        }

        return res;
    };

    const successReturn = {
        city: 'London',
        temp: 19.41
    };

    const dateNow = moment.utc(moment(), 'DD-MM-YYYY HH:mm:ss');

    let mockedRepo;
    before(() => {
        mockedRepo = sinon.mock(weatherRepository);
    });
    beforeEach(() => {
        const mockedgetCityByName = sinon.stub(weatherRepository, 'getCityByName');
        const mockeddateDiff = sinon.stub(weatherRepository, 'diffMoment');
        
        mockeddateDiff.withArgs(dateNow).returns(Promise.resolve(0));

        mockedgetCityByName.withArgs('London').returns(Promise.resolve(successReturn));
        mockedgetCityByName.withArgs('LondonLondon').returns(Promise.resolve());
        mockedgetCityByName.withArgs(undefined).throws('error: WHERE parameter "id" has invalid "undefined" value');
    });
    afterEach(() => {
        sinon.restore();
    });
    after(() => {});

    it('Should returns 200 status code', async () => {
        //Arrange
        const res = mockResponse();
        const req = { params: { city: 'London' } };

        //Act
        const result = await weatherController.getWeatherByCity(req, res);

        //Assert
        chai.assert.equal(result.statusCode, 200);
        chai.assert.equal(result.jsonReturned, successReturn);
    });
});
