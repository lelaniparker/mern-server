const express = require("express")
const cors = require("cors") // Enabling application middleware
const bodyParser = require("body-parser")
const dataRouter = require("./routes/data_routes") // Set up routing

const port = 3000 // Routing to listen on port 3000

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use("/data", dataRouter)

app.listen(port, () => {
	console.log(`AnalyzeVit app listening on port ${port}`)
})