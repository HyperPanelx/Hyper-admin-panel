const f=require('node-fetch');
const express=require('express');
const loginRoute=express.Router()

const loginEncode = (username,password) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "");
    urlencoded.append("scope", "");
    urlencoded.append("client_id", "");
    urlencoded.append("client_secret", "");
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    return urlencoded
}

loginRoute.post('/',async (req,res,next)=>{
    const body=req.body
    f('http://166.1.131.76:6655/token',{
                method:'POST',
                body:loginEncode(body.username,body.password),
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                }
    }).then(response=>response.json()).then(response=>{
        if(body.rememberMe){
            res.cookie('x_hyper_x',response.access_token,{
                maxAge:10*24*60*60,
                httpOnly:false,
            })
            res.status(200).send('cookie saved')
        }else{
            res.status(200).send('you logged in')
        }
    }).catch(err=>{
        res.status(401)
    })

    
    
})




module.exports=loginRoute