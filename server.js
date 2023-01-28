const express = require('express')
const app = express()

const PORT = process.env.PORT || 3500
app.use(express.json())
app.use('/register',require('./routes/api/register'))
app.use('/login',require('./routes/api/login'))


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})