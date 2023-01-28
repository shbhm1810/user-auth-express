const express = require('express')
const app = express()
var cookies = require("cookie-parser");

const PORT = process.env.PORT || 3500
app.use(express.json())
app.use(cookies())
app.use('/register',require('./routes/api/register'))
app.use('/login',require('./routes/api/login'))
app.use('/refresh',require('./routes/api/refresh'))
app.use('/logout',require('./routes/api/logout'))


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})