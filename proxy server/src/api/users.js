const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();
const helper=require('../helper')

//// users page
router.get('/list', (req,res)=>{
    const token=req.cookies[process.env.COOKIE_NAME]
    if(token){
        fetch(process.env.API_BASE+'get-users',{
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }).then(response=>response.json()).then(response=>{
            res.status(200).send({
                titles:['user info','traffic','User limitation','Contact info','Date','status','operation'],
                rows:response.map((item,index)=>{
                    return {...item,uid:index+1}
                })
            })
        }).catch(err=>{
            res.status(400).send('error in connecting to api!')
        })
    }

})
router.post('/create',(req,res)=>{
    const token=req.cookies[process.env.COOKIE_NAME]
    if(token){
        const body=req.body
        const queryObj={
            username:body.username,
            multi:body.concurrent_user,
            passwd:body.password,
            exdate:body.expiration_date,
            telegram_id:body.telegram_id,
            phone:body.phone,
            email:body?.email ?? '',
            referral:body?.referral ?? '' ,
            desc:body?.description ?? '',
            traffic:body.traffic ? `${body?.traffic ?? ''} ${body?.traffic_unit ?? ''}` : '',
        }
        fetch(process.env.API_BASE+'add-user?'+helper.querySerialize(queryObj),{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(401).send('error in connecting to api!')
        })
    }

})

router.delete('/delete-several',(req,res)=>{
    const usernames=req.query.username
    const token=req.cookies[process.env.COOKIE_NAME]
    if(usernames && token){
        res.status(200).end()
    }else{
        res.status(400).send('missing required query username!')
    }
});
router.delete('/delete/:username',(req,res)=>{
    const username=req.params.username
    const token=req.cookies[process.env.COOKIE_NAME]
    if(username && token) {
        fetch(process.env.API_BASE+'delete-user?'+helper.querySerialize({username}),{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).end()
        })
    }else{
        res.status(400).send('missing required params username!')
    }
});
router.post('/lock/:username',(req,res)=>{
    const username=req.params.username
    const token=req.cookies[process.env.COOKIE_NAME]
    if(username && token) {
        fetch(process.env.API_BASE+'lock-user?'+helper.querySerialize({username}),{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).end()
        })
    }else{
        res.status(400).send('missing required params username!')
    }

});
router.post('/unlock/:username',(req,res)=>{
    const username=req.params.username
    const token=req.cookies[process.env.COOKIE_NAME]
    if(username && token) {
        fetch(process.env.API_BASE+'unlock-user?'+helper.querySerialize({username}),{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).end()
        })
    }else{
        res.status(400).send('missing required params username!')
    }

});
router.post('/renew-user/:username',(req,res)=>{
    const username=req.params.username;
    const token=req.cookies[process.env.COOKIE_NAME];
    if(username && token) {
        const body=req.body;
        fetch(process.env.API_BASE+'renew-user?'+ helper.querySerialize({username:username,exdate:body.date}),{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).end()
        })
    }else{
        res.status(400).send('missing required params username!')
    }


});
router.post('/change-password/:username',(req,res)=>{
    const username=req.params.username;
    const token=req.cookies[process.env.COOKIE_NAME];
    if(username && token) {
        fetch(process.env.API_BASE+'change-passwd-user?'+helper.querySerialize({username}),{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).send(response)
        }).catch(err=>{
            res.status(401).end()
        })
    }else{
        res.status(400).send('missing required params username!')
    }
})

//// online user page
router.get('/online-list',(req,res)=>{
    const token=req.cookies[process.env.COOKIE_NAME]
    if(token){
        fetch(process.env.API_BASE+'active-user',{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).send({
                titles:['#','Username','IP Address','Management'],
                rows:response.slice(1,response.length-1).split(',').map((item,index)=>{
                    return {
                        user:item.trim().slice(1,item.trim().length-1),
                        ip:'',
                        uid:index+1
                    }
                })
            })
        }).catch(err=>{
            res.status(400).send('error in connecting to api!')
        })
    }
})
router.post('/kill-online/:username',(req,res)=>{
    const username=req.params.username
    const token=req.cookies[process.env.COOKIE_NAME]
    if(username && token){
        fetch(process.env.API_BASE+'kill-user?'+helper.querySerialize({username}),{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(400).send('error in connecting to api!')
        })
    }else{
        res.status(400).send('missing required params username!')
    }
})
router.delete('/kill-several',(req,res)=>{
    const usernames=req.query.username
    const token=req.cookies[process.env.COOKIE_NAME]
    if(usernames && token){
        res.status(200).end()
    }else{
        res.status(400).send('missing required query username!')
    }

})

module.exports=router