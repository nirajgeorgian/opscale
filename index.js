const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = express.Router()

const app = express()
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
