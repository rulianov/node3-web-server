const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2FyeTg1OTYiLCJhIjoiY2s2ZDJxZnprMTh6czNtbjM3YWs2dTY2ZiJ9.YOhgsFIcrxmeWD5shoJPNg&limit=1`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to server', undefined)
        } else if (body.features.length === 0) {
            callback('Can not find the location', undefined)
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            callback(undefined, {
                latitude,
                longitude,
                'location': body.features[0].place_name
            })
        }
    })
}


const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/2e7d86d365abec66622e1a84fc2c5535/${latitude},${longitude}?units=si&lang=ru`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary}, it is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`)
        }
    })
        
}


module.exports = {
    geocode: geocode,
    forecast: forecast
}