const express = require("express");
const app = express();
const db = require("./db.js")
const jobsRoute = require("./routes/jobRoutes")
const usersRoute = require("./routes/userRoutes")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authenticateUser = require('./middleware/authentication')
app.use(express.json())
app.use(cookieParser())
// app.use(express.urlencoded({
//     extended:false
// }))
app.use(bodyParser.json())
app.use('/api/jobs',authenticateUser,jobsRoute)
app.use('/api/users',usersRoute)
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server on port ${port}`))

