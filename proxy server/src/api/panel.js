const express=require('express')
const fetch=require('node-fetch');
const router=express.Router()
const helper=require('../helper')


router.post('/admin',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body){
        const query=helper.querySerialize({username:body.admin_username,passwd:body.admin_password})
        fetch(process.env.API_BASE+'panel/create/?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(JSON.stringify(response)).end()
            }else{
                res.status(200).send(JSON.stringify('user created')).end()
            }
        }).catch(err=>{
            res.status(400).send('error in connecting to api!').end()
        })
    }else{
        res.status(400).send('missing required body!').end()
    }
})




module.exports=router
