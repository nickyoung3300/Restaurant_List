// 引入 express 套件

const express = require('express')

//啟用 express

const app = express()

// 設 port 為 3000

const port = 3000

//引入 express-handlebars

const exphbs = require('express-handlebars')

//設定 layout

app.engine('handlebars',exphbs({defaultLayout:'main'}))

app.set('view engine','handlebars')

//引入 public 中的Css

app.use(express.static('public'))

//引入JSON資料

const restaurantList = require('./restaurant.json')

//首頁

app.get('/',(req,res)=>{

    const restaurantList_index = restaurantList.results
    //console.log(restaurantList_index)
    res.render('index',{restaurantList_index:restaurantList_index})
})

//Restaurant Detail

app.get('/restaurants/:restaurant_id',(req,res)=>{

    //console.log(req.params.restaurant_id)

const restaurantShow = restaurantList.results.find(item => item.id.toString() === req.params.restaurant_id.toString())

    //console.log(restaurantShow.id)
    //console.log(restaurantShow.name)


res.render('show',{restaurant_show:restaurantShow})
})

//搜尋路由

app.get('/search',(req,res)=>{

    const keyword = req.query.keyword
    const restaurantSearch = restaurantList.results.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
    //console.log(restaurantSearch)
    res.render('index',{restaurantList_index:restaurantSearch,keyword:keyword})
})

//啟用伺服器

app.listen(port,()=>{
console.log('server')
})