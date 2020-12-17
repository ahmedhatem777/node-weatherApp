const request = require('postman-request');

const weatherstackUrl = "http://api.weatherstack.com/current?access_key=bcb6f640f2ade005c5bc1a4f20fd7e36&query=";



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