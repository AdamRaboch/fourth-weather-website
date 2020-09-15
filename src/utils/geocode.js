const request = require('postman-request')

const geocode = (address, callback) => {
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRhbW92ZXNlbiIsImEiOiJja2R6dm1scWowNHdrMnlwOWV1MmtldzFlIn0.ql3_QIi28imnjnEBrNM6_A&limit=1'
    request({url: urlGeo, json: true}, (error, response) => {
        if (error)  {
            callback('Unable to connect to MapBox.', undefined)
        } else if (!response.body.features[0])  {
            callback('Unable to find location.  Try another search.', undefined)
        }  else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}



module.exports = geocode