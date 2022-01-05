const express = require('express')

const app = express()

const port = 3000

const exphbs = require('express-handlebars')

app.engine('handlebars',exphbs({defaultLayout:'main'}))

app.set('view engine','handlebars')

app.use(express.static('public'))

const restaurantList = require('./restaurant.json')

app.get('/',(req,res)=>{

    const restaurantList_index = restaurantList.results
    console.log(restaurantList_index)
    res.render('index',{restaurantList_index:restaurantList_index})
})

app.get('/restaurants/:restaurant_id',(req,res)=>{
console.log(req.params.restaurant_id)

const restaurantShow = restaurantList.results.find(item => item.id == req.params.restaurant_id)

console.log(restaurantShow.id)
console.log(restaurantShow.name)

res.render('show',{restaurant_show:restaurantShow})
})

app.get('/search',(req,res)=>{

    const restaurantSearch = restaurantList.results.filter(item => item.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
    console.log(restaurantSearch)
    res.render('index',{restaurantList_index:restaurantSearch})
})

app.listen(port,()=>{
console.log('server')
})