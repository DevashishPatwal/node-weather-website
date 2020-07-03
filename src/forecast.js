const request = require('request')
const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) + '&appid=98c34c2b7c860284d48bc82dd69819f3&limit=1'
    request({ url }, (error, { body }) => {
        if (error) {
            callback('error', undefined)
        }
        else {
            const data = JSON.parse(body)
            callback(undefined, data)
        }
    })
}

module.exports = forecast
