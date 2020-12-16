const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocodeAPI');
const getWeather = require('./utils/weatherAPI');

const app = express();

//Paths
const partialsPath = path.join(__dirname, '../partials');
const publicDirectoryPath = path.join(__dirname, '../public');

//View setup
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

//Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        name: 'Ahmed Hatem'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About page",
        name: 'Ahmed Hatem'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help page",
        name: 'Ahmed Hatem'
    });
})

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if(address){
        geocode(address, (err, {lat, long, location} = {} ) => {
            if(err){
                res.send({
                    error: err
                })
            }
            else{
                getWeather(lat, long, (err, forecastData) => {
                    if(err){
                        res.send({
                            error: err
                        })
                    }
                    else{
                        res.send({
                            forecast: forecastData,
                            location
                        })
                    }
                })
            }
        })
    }
    else{
        res.send({
            error: 'Please specify an address!'
        })
    }
    
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }
    else{
        res.send({
            products: [req.query.search, req.query.rating]
        })
    }
    
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: "Error 404",
        errorMessage: "Help article not found!",
        name: "Ahmed Hatem"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: "Error 404",
        errorMessage: "Page not found!",
        name: "Ahmed Hatem"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})