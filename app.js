// setting express
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const port = 3000
const restaurants = require('./restaurant')

// change view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting routes
app.get('/', (req,res) => {
  res.render('index', { restaurant: restaurants.results, isKeywordExist: 1 })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurant = restaurants.results.filter((restaurant) => {
    return restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.name.includes(keyword) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurant, keyword, isKeywordExist: restaurant.length })
})

// start and listen
app.listen(port, () => {
  console.log(`This website is running on http://localhost:${port}`)
})