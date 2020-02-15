const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
//Define paths for Express
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//setup static directrory to serve
app.use(express.static(publicDirectory))
/*
app.get('', (req, res) => {
})

app.get('/help', (req, res) => {
})

app.get('/about', (req, res) => {
    res.send('about.html')
})
*/

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Donkey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Donkey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Donkey'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode.geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        


        if(error) {
            return res.send({
                error: error
            })
        }
    
        geocode.forecast(latitude, longitude, (error, forcastData) => {
    
            if (error) {
                return res.send({
                    error: error
                })
            }
            
            data = {
                location,
                forcastData
            }
           res.send(data)
          })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you have to provide a search term'
        })
    }
    res.send({
        'products': []
    })
})


//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res) => {
    res.render('help404', {
        title: 'Help article not found',
        name: 'Donkey'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Donkey'
    })
})

app.listen(post = 3000, () => {
    console.log('Server is up on port 3000')
})