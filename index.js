require("dotenv").config()
const express = require("express")
const massive = require("massive")
const ctrl = require("./products_controler")

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
  })
    .then(db => {
      app.set("db", db)
    })
    .catch(err => console.log(err))

app.use(express.json())

app.post('/api/products', ctrl.create)
app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, () => {
  console.log(`Definitely listening on port ${SERVER_PORT}.`)
})