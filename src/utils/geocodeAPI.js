const request = require('postman-request');

const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Heliopolis.json?access_token=pk.eyJ1IjoiYWhtZWRoYXRlbTc3NyIsImEiOiJja2lpNDk0N2IwMHlsMnpteDV0NnZvZTEzIn0.uXadE-WbgxVzerWDTRaR8g";


const geocode = (addressName, callback) => {
    let url = mapboxUrl.replace('Heliopolis', encodeURIComponent(addressName));

    request({url, json: true}, (err, {body} = {}) => {
        if(err){
            callback('Unable to contact geocoding API', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location, Try another search.', undefined)
        }
        else{
            callback(undefined, {
                 lat: body.features[0].center[1],
                 long: body.features[0].center[0],
                 location: body.features[0].place_name
                 }
            )
        }
    })
}

module.exports = geocode;
