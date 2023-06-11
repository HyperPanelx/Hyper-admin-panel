require('dotenv').config()
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const cookieParser = require('cookie-parser');
const app=express()
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors({
    origin: true,
    credentials: true,
}))

/// credentials: "include"


//// middleware
const mw=require('./middleware/auth')
app.use(mw())

//// authentication route
const authRoute=require('./api/auth')
//// dashboard route
const dashboardRoute=require('./api/dashboard')
//// users route
const usersRoute=require('./api/users')
//// panel route
const panelRoute=require('./api/panel')

app.use('/api/auth',authRoute)
app.use('/api/dashboard',dashboardRoute)
app.use('/api/user',usersRoute)
app.use('/api/panel',panelRoute)

app.listen(process.env.PORT || 8000,()=>console.log(`server is running on port ${process.env.PORT || 8000}`))
