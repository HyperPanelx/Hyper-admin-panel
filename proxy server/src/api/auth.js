const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();
const helper=require('../helper')


router.post('/login', (req,res)=>{
    const body=req.body
    if(body){
        fetch(process.env.API_BASE+'token',{
            method:'POST',
            body:helper.bodyEncode(body.username,body.password),
            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(JSON.stringify(response)).end()
            }else{
                res.status(200).send(JSON.stringify(response.access_token)).end()
            }
        }).catch(err=>{
            res.status(503).send('error in connecting to api!').end()
        })
    }else{
        res.status(406).send('missing body params!').end()
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
        if(response.detail){
            res.status(404).send('error in finding user').end()
        }else if(response.username){
            res.status(200).send(JSON.stringify(response.username)).end()
        }else{
            res.status(503).send('error in api!').end()
        }
    }).catch(err=>{
        res.status(503).send('error in connecting to api! route: api/auth/me => panel/me/').end()
    })
});


module.exports=router