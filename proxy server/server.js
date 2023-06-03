require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const cookieParser = require('cookie-parser');
const app=express()
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
}))

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Headers","*");
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     next();
// });

const loginRoute=require('./routes/login')
const meRoute=require('./routes/me')

app.use('/api/login',loginRoute)
app.use('/api/me',meRoute)


app.listen(process.env.PORT || 8000,()=>console.log(`server is running on port ${process.env.PORT || 8000}`))
