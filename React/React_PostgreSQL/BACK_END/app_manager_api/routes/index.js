var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

// Connecting
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'tuyenha@#123',
  port: 3001,
})

/* GET home page. */
router.get('/', function (req, res, next) { });

// duong dan de api biet lay du lieu thong qua link do: from postgreSQL
router.get('/getdata', function (req, res, next) {
  // Website you wish to allow to connect
  // toi la API cua FE nao
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // get data, no lay data tu product_nfo day vao response
  pool.query('SELECT * FROM product_info', (error, response) => {
    if (error) {
      console.log(error)
    } else {
      // console.log(response.rows)
      // front end nhna dc data tu API
      res.send(response.rows)
    }
  })

  // k can render nen xoa
  // res.render('index', { title: 'Express'})
})
router.get('/add', function (req, res, next) {
  res.render('add', {})
});

// post lay du lieu khi nhan sublit
router.post('/add', function (req, res, next) {
  var product_name = req.body.product_name,
      product_price = req.body.product_price,
      image = req.body.image
  pool.query('INSERT INTO product_info(product_name, product_price, image) VALUES ($1, $2, $3)', 
  [product_name, product_price, image], (err, response) => {
    if(err) { 
      res.send(err)
      res.send(0)
    }else{
      res.send(1);
    }
  })
})
module.exports = router;
