const express = require('express')
const app = express()
const port = 4000
const router = require("./routes")
const cors = require("cors")

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(cors())

app.use(express.json())

app.use(router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})