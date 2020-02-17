const request = require('request')

const geocode = (address, callback) => {
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiY3J1aHNlcm8iLCJhIjoiY2s2bDk1YmdoMGJwOTNqcWdlajJpeHh4cyJ9.h6WE-5wcE3gFp80_dfNS-A&limit=1`
    request ({ url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to geolocation service!', undefined)
        } else if (body.message || body.features.length === 0){
            callback('Unable to find location! Try another search.', undefined)
        } else {
            callback (undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode