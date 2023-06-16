const express=require('express')
const fetch=require('node-fetch');
const router=express.Router()
const helper=require('../helper')


///// search
router.get('/search',(req,res)=>{
    const username=req.query.username
    const token=req.headers.token
    if(username){
        fetch(process.env.API_BASE+`search-user?username=${username}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,response))
            }
        }).catch(err=>{
            res.status(401).send('error in connecting to api!')
        })
    }else{
        res.status(400).send('missing required query param username!').end()
    }

})

///// create admin user
router.post('/admin',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body.admin_username && body.admin_password){
        const query=helper.querySerialize({username:body.admin_username,passwd:body.admin_password})
        fetch(process.env.API_BASE+'panel/create/?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null));
            }else{
                res.status(200).send(helper.responseHandler(false,null,null));
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null));
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username and password required',null));
    }
})

///// change password
router.post('/change-password',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body.username && body.new_password) {
        const query=helper.querySerialize({mode:'admin',username:body.username,passwd:body.new_password})

        fetch(process.env.API_BASE+'change-passwd-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null));
            }else{
                res.status(200).send(helper.responseHandler(false,null,null));
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null));
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username and password required',null));
    }
})

///// change ssh port
router.post('/change-ssh',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body.new_ssh) {
        const query=helper.querySerialize({new_ssh:Number(body.new_ssh)})
        res.status(200).send(helper.responseHandler(false,null,null));
    }else{
        res.status(200).send(helper.responseHandler(true,'new ssh port required',null));
    }
})

///// change user limitation
router.post('/user-limitation',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    if(body.status) {
        const query=helper.querySerialize({status:body.status})
        if(body.status==='Active'){
            /// change status to active

            res.status(200).send(helper.responseHandler(false,null,{status:'Active'}));
        }else{
            /// change status to deactive
            res.status(200).send(helper.responseHandler(false,null,{status:'Deactive'}));
        }
    }else{
        res.status(200).send(helper.responseHandler(true,'status required',null));
    }
})


///// telegram robot
router.post('/telegram-robot',(req,res)=>{
    const body=req.body
    const token=req.headers.token
    const query=req.query
    if(query.session_file==='false' && body.robot_token && body.manager_id) {
        const reqQuery=helper.querySerialize({token:body.robot_token,id:body.manager_id});

        res.status(200).send(helper.responseHandler(false,null,null));
    }else if(query.session_file==='true' && body.file){
        const jsonData=body.file
        console.log(jsonData)

        res.status(200).send(helper.responseHandler(false,null,null));
    }else{
        res.status(200).send(helper.responseHandler(true,'session_file query and body required',null));
    }
})










module.exports=router
