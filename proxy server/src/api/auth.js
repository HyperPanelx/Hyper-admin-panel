const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();
const helper=require('../helper')


router.post('/login',async (req,res)=>{
    const body=req.body
    if(body){
        fetch(process.env.API_BASE+'token',{
            method:'POST',
            body:helper.bodyEncode(body.username,body.password),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).send(response.access_token)
        }).catch(err=>{
            res.status(401).send('error in connecting to api!')
        })
    }else{
        res.status(401).send('missing body params!')
    }

});
router.get('/me',(req,res)=>{
    const token=req.headers.token
    fetch(process.env.API_BASE+'panel/me/',{
        headers:{
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then(response=>response.json()).then(response=>{
        res.status(200).send(response.username)
    }).catch(err=>{
        res.status(401).send('error in finding user')
    })
});


module.exports=router