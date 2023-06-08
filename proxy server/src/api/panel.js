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

router.post('/change-password',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body) {
        const query=helper.querySerialize({username:body.username,new_pass:body.new_password})
        res.status(200).send(JSON.stringify('ok')).end()
    }else{
        res.status(400).send('missing required body!').end()
    }
})

router.post('/change-ssh',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body) {
        console.log(body)
        const query=helper.querySerialize({new_ssh:Number(body.new_ssh)})
        res.status(200).send(JSON.stringify('ok')).end()
    }else{
        res.status(400).send('missing required body!').end()
    }
})

router.post('/user-limitation',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body) {
        const query=helper.querySerialize({status:body.status})
        if(body.status==='Active'){
            /// change status to active
            res.status(200).send(JSON.stringify('Active')).end()
        }else{
            /// change status to deactive
            res.status(200).send(JSON.stringify('Deactive')).end()
        }
    }else{
        res.status(400).send('missing required body!').end()
    }
})

router.post('/telegram-robot',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    const query=req.query
    if(body) {
        if(query.session_file==='false'){
            const reqQuery=helper.querySerialize({token:body.robot_token,id:body.manager_id})
        }else{
            const jsonData=body.file
            console.log(jsonData)
        }
        res.status(200).send(JSON.stringify('ok')).end()
    }else{
        res.status(400).send('missing required body!').end()
    }
})


module.exports=router
