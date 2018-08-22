const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const router = express.Router()

const app = express()
mongoose.connect("mongodb://127.0.0.1:27017/dodo", {useNewUrlParser: true })
	.then(res => {
		console.log("connected to database")
	})
	.catch(err => {
		console.log(err)
		process.end()
	})

const personSchema = new mongoose.Schema({
	name: String,
	email: String,
	phone: String
})

const Person = mongoose.model('Person', personSchema)

app.use(cors())
router.route("/")
  .get((req, res) => {
    res.send({
      dodo: "duck"
    })
  })

app.use("/", router)

app.listen(3000, () => {
  console.log("listening on http://localhost:3000")
})
