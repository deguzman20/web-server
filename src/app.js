const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Andy',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Andy',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    name: 'Andy',
  })
})

app.get('/weather', (req, res) => {
  console.log(req.query)
  if(!req.query.weather) {
    res.send({
      error: 'You must provide a weather term'
    })
  } 

  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia',
    name: 'Andy',
  })
})

app.get('/products', (req, res) => {
  console.log(req.query)
  if(!req.query.search) {
    res.send({
      error: 'You must provide a search term'
    })
  } 

  res.send({
    products: [],
  })
})


app.get('/help/*', (req, res) => {
  res.send('Help article not found');
})

app.get('*', (req, res) => {
  res.send('404 not found');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})

// e in nodemon stand for extension