const request = require('request')

const forecast = (latitude ,longitude, callback) => {
    const url = `https://api.darksky.net/forecast/75f6ae4657c68d048b67b4e8394febf8/${latitude},${longitude}?units=si`
    request ({ url, json: true}, (error, {body}) =>{
        if (error){
            callback ('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback ('Unable to find location!', undefined)
        } else{
            callback (undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability * 100}% chance of rain. \n The highest temperature today is ${body.daily.data[0].temperatureHigh} and the lowest temperature is ${body.daily.data[0].temperatureLow}`)
        }
    })

}

module.exports = forecast