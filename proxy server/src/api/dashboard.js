const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();


router.get('/server',(req,res)=>{
    const token=req.cookies[process.env.COOKIE_NAME]
    res.status(200).send({
        cpu:67,
        ram:24,
        disk:47,
        bandWidth:{
            download:117,
            upload:1.3
        }
    })
})
router.get('/users-status',(req,res)=>{
    const token=req.cookies[process.env.COOKIE_NAME]
    res.status(200).send([
        {
            title:'All Users',
            number:20,
            theme:'indigo'
        },{
            title:'Active Users',
            number:65,
            theme:'green'
        },{
            title:'Online Users',
            number:40,
            theme:'blue'
        },{
            title:'Blocked Users',
            number:20,
            theme:'red'
        },
    ] )
})


module.exports=router