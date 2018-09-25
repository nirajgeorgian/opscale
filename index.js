const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const router = express.Router()

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.connect("mongodb://opmongo:27017/dodo", {useNewUrlParser: true })
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

router.route("/")
  .get((req, res) => {
    res.send({
      dodo: "duck"
    })
  })

/*
	Utility merror message
*/
const checkKeys = (obj, ...args)	=> {
	let value = true
	const keys = Object.keys(obj)
	args.forEach(key => {
		value = value && keys.includes(key)
	})
	return value
}

const errMessage = (res, msg) => {
	return res.status(401).send({
		status: false,
		msg
	})
}

const succMessage = (res, data) => {
	return res.status(200).send({
		status: true,
		data
	})
}

router.route("/users/:id")
	.get((req, res) => {
		if(req.params.id) {
			Person.findById(req.params.id)
				.then(person => {
					succMessage(res, person)
				})
				.catch(err => {
					errMessage(res, err)
				})
		}
	})
	.put((req, res) => {
		if(req.params.id) {
			Person.findByIdAndUpdate(req.params.id, { ...req.body }, (err, person) => {
				if(person) {
					succMessage(res, person)
				} else {
					errMessage(res, "err")
				}
			})
		}
	})
	.delete((req, res) => {
		if(req.params.id) {
			Person.findByIdAndDelete(req.params.id, (err, person) => {
				if(person) {
					succMessage(res, person)
				} else {
					errMessage(res, "err")
				}
			})
		}
	})

router.route("/users")
	.post((req, res) => {
		if(checkKeys({...req.body}, "name", "email", "phone")) {
			const newPerson = new Person({...req.body })
			newPerson.save()
				.then(person => {
					succMessage(res, person)
				})
		} else {
			errMessage(res, "please pass all parameter")
		}
	})
	.get((req, res) => {
		Person.find({})
			.then(persons => {
				succMessage(res, persons)
			})
			.catch(err => {
				return errMessage(res, err.message())
			})
	})

app.use("/", router)

app.listen(8081, () => {
  console.log("listening on http://localhost:8081")
})
