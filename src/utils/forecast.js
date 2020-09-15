//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error

const request = require('postman-request')

//    - Success, pass forecast string for data (same format as from before)
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a3c2b3c09b88788f749508fbb59196f5&query='+latitude+','+longitude+'&units=m'
    request({url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error)  {
            callback('Unable to find location.', undefined)
        }  else {
            callback(undefined, `Currently, the weather is ${response.body.current.weather_descriptions[0]}; the temperature is ${response.body.current.temperature} degrees, but it feels like ${response.body.current.feelslike} degrees.`)
        }
    })
}





module.exports = forecast