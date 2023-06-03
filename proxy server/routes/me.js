const f=require('node-fetch');
const express=require('express');
const meRoute=express.Router()
function getCookieValue(cookieName = '', cookie = '') {
    const matches = cookie.match(`(^|[^;]+)\\s*${cookieName}\\s*=\\s*([^;]+)`)
    return matches ? matches.pop() : ''
}

meRoute.get('/',(req,res)=>{
    const token=req.cookies['x_hyper_x']
    if(token){
        f('http://166.1.131.76:6655/panel/me/',{
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }).then(response=>response.json()).then(response=>{
            res.status(200).send(response.username)
        }).catch(err=>{
            res.status(402).send('error in finding user')
        })


    }else{
        res.status(401).send('token is not provided')
    }


})




module.exports=meRoute