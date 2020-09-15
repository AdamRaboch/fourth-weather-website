const path = require('path')
const express = require('express')
const { response } = require('express')
const hbs = require('hbs')

const app = express()
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// set up static directory to serve
app.use(express.static(publicDirectoryPath))

//hbs homepage
app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather Now',
        name: 'Created by AR'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About the Project',
        name: 'Created by AR'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'Help',
        name: 'Created by AR'
    })
})

app.get('/weather', (request, response) => {
    const address = request.query.address
    if (!request.query.address)  {
        return response.send({
            error: 'Please provide an address'
        })
    }
    request.query
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return response.send({
                error: error
            })
        } else if (!address) {
            return response.send('Please enter a geographic location.')
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)  {
            return response.send({
                error: error
            })
            }
            response.send({
                "forecast": forecastData,
                location,
                address
            }
            )

    })
})
}
)


app.get('/products', (request, response) => {
    if (!request.query.search)  {
       return response.send({
            error: 'You must provide a search term.'
        })
    }
        request.query
    response.send({
        products: []
    })
})
app.get('/help/*', (request, response) => {
    response.render('404', {
        title: 404,
        errorMessage: '404: Page not found',
        name: 'Created by AR'
    })
})
app.get('*', (request, response) => {
    response.render('404', {
        title: 404,
        errorMessage: '404: Page not found',
        name: 'Created by AR'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})