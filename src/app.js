const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000
//specify path for static directory and views path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

//set view engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather', name: 'Devashish Patwal'

    })
})
app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', name: 'Devashish Patwal' })
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Me', name: 'Devashish Patwal' })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help',
        errorCode: 404,
        errorMessage: 'Help can\'t be displayed', name: 'Devashish Patwal'
    })
})
const request = new require('request')
const forecast = require('./forecast')
const geocode = require('./geocode')

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Plz provide an address'
        })
    }

    geocode(req.query.address, (error, { place_name, longitude, latitude }) => {

        forecast(longitude, latitude, (error, { main }) => {
            console.log(main)
            res.send({ place_name, latitude, longitude, Forecast: main })
        })
    })

})
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        errorCode: 404,
        errorMessage: 'Page not found', name: 'Devashish Patwal'
    })
})

app.listen(port, () => {
    console.log('Server up and running at port' + port)
})