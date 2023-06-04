const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();


router.get('/server',(req,res)=>{
    const token=req.headers.token
    fetch(process.env.API_BASE+'resource-usage',{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then(response=>response.json()).then(response=>{
        const uploadSpeed=response[1]['Upload Speed']
        const downloadSpeed=response[1]['Download Speed']
        const download=response[1]['Download']
        const upload=response[1]['Upload']
        res.status(200).send({
            cpu:response[0].cpu,
            ram:response[0].mem,
            disk:response[0].hdd,
            bandWidth:{
                download:Number(download.slice(0,download.length-2)) ,
                upload: Number(upload.slice(0,upload.length-2)) ,
                downloadSpeed:Number(downloadSpeed.slice(0,downloadSpeed.length-2)),
                uploadSpeed:Number(uploadSpeed.slice(0,uploadSpeed.length-2)),
                speedUnit:downloadSpeed.slice(downloadSpeed.length-2),
            }
        })
        res.status(200).end()
    }).catch(err=>{
        console.log(err)
        res.status(400).end()
    })


})
router.get('/users-status',(req,res)=>{
    const token=req.headers.token
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