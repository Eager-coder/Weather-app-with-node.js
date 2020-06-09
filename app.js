const request = require('request')
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('index')
})
app.get('*', (req, res) => {
    res.send('404')
})
app.get('/weather', (req, res) => {
    const location = req.query.address
    if (!location || '' || null) {
     res.send({error:'Please provide an address'})    
    } else {
        getWeather(location, (error, response) => {
            if (error) {
                res.send(error)
            } else if (response.body.message === 'city not found') {
                res.send({error: 'City not found'})
            } else {
                res.send( response.body)
            }
        }) 
    }
})
app.listen(3000, () => {
    console.log('Server is listening')
})
const getWeather = (cityName, callback) => {
    const key = process.env.API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
    request({url, json: true}, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else {
            callback(undefined, response)
        }
    })
}

require('dotenv').config()
