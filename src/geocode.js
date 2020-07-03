const request = require('request')
const geocode = (address, callback) => {
    const coordinates = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXBpdGVzdGluZyIsImEiOiJja2MxaHNkOG0waXEwMnJsZmRqeng3aWprIn0.tB8EL1K_Y0YaaPglFkdAfA'
    request({ url: coordinates, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to server', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find locaation', undefined)
        }
        else {
            const place_name = body.features[0].place_name
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            callback(undefined, { place_name, longitude, latitude })
        }
    })
}
module.exports = geocode