const request = require('postman-request');
require('dotenv').config();

const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACKKEY}`;

getWeather = (lat, long, callback) => {
    let url = weatherstackUrl + lat + ',' + long;

    request({url, json: true}, (err, {body} = {}) => {
        if(err){
           callback('Unable to contact the weather API', undefined);
        }
        else if(body.error){
            callback('Please enter a valid location!', undefined);
        }
        else{
            const temp = body.current.temperature;
            const precip = body.current.precip;
            const forecast = body.current.weather_descriptions[0];
            const humidity = body.current.humidity
            callback(undefined, 'Weather is ' + forecast + '. It is currently ' + temp  + 
                                ' degrees, there is ' + precip  + ' precipitation and the humidity is ' + 
                                humidity + '%.');     
        }
    })
}

module.exports = getWeather;