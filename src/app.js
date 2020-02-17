const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Aymen'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About us',
        name: 'Aymen'
    })
})

app.get('/help', (req,res) =>{
    res.render('Help',{
        title: 'Help',
        message: 'How can I help you ?',
        name: 'Aymen'
    })
})


app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address!'
        })
    }
    
    geocode(req.query.address, (error,{longitude,latitude,location} = {})=>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error,forecast) =>{
            if (error){
                return res.send({error})
            }
            return res.send({
                address: req.query.address,
                location: location,
                forecast,
            })
        })
    })
})


app.get('/help/*', (req,res)=>{
    res.render('404',{
        title : '404 not found',
        message : 'I can\'t help you with that',
        name : 'Aymen'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title : '404 not found',
        message : 'I don\'t exist',
        name : 'Aymen'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})