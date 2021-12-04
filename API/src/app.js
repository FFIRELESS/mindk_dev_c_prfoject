const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('This is testing api')
})

console.log(process.env.APP_PORT);
app.listen(process.env.APP_PORT);