const express = require('express')
const app = express()
const api = require('./server/routes/api')
const path=require('path')


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/bankDB', { useNewUrlParser: true })
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', api)

//serve static assets
// if(process.env.NODE_ENV==='production') {
// app.use(express.static('bank/my-app/public/index.html'));
// app.get('*',(req,res)=>{
// res.sendFile(path.resolve(__dirname,'bank','my-app','public','index.html'));
// });
// }


const PORT=process.env.PORT ||4200;
//const port = 4200
if(process.env.NODE_ENV==='prduction') {
    app.use(express.static('bank/build'));
}


app.listen(PORT, function () {
    console.log(`Running on port ${PORT}`)
})
