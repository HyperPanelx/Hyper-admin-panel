const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();
const helper=require('../helper')

//// users page
router.get('/list', (req,res)=>{
    const token=req.headers.token
    fetch(process.env.API_BASE+'get-users',{
        headers:{
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then(response=>response.json()).then(response=>{
        res.status(200).send(JSON.stringify({
            titles:['user info','traffic','User limitation','Contact info','Date','status','operation'],
            rows:response.map((item,index)=>{
                return {...item,uid:index+1}
            })
        })).end()
    }).catch(err=>{
        res.status(400).send('error in connecting to api!').end()
    })

})
router.post('/create',(req,res)=>{
    const token=req.headers.token
    const body=req.body
    const query=helper.querySerialize({
        username:body.username,
        multi:Number(body.concurrent_user),
        passwd:body.password,
        exdate:body.expiration_date,
        telegram_id:body.telegram_id,
        phone:Number(body.phone),
        email:body?.email ?? '',
        referral:body?.referral ?? '' ,
        desc:body?.description ?? '',
        traffic:body.traffic ? `${body?.traffic ?? ''} ${body?.traffic_unit ?? ''}` : '',
    });

    fetch(process.env.API_BASE+'add-user?'+query,{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
    }).then(response=>response.json()).then(response=>{
        if(response.username && response.password){
            res.status(200).send(JSON.stringify(response)).end()
        }else{
            res.status(200).send(JSON.stringify(false)).end()
        }
    }).catch(err=>{
        res.status(401).send('error in connecting to api!').end()
    })
})

router.delete('/delete-several',(req,res)=>{
    const usernames=req.query.username
    const token=req.headers.token
    if(usernames){
        fetch(process.env.API_BASE+'del-kill-users?mode=del',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(usernames)
        }).then(response=>response.json()).then(response=>{
            if(response){
                res.status(200).end()
            }else{
                res.status(401).send('error in inputs!').end()
            }
        }).catch(err=>{
            res.status(401).send('error in connecting to api!').end()
        })
    }else{
        res.status(400).send('missing required query username!').end()
    }
});
router.delete('/delete/:username',(req,res)=>{
    const username=req.params.username
    const token=req.headers.token
    if(username ) {
        const query=helper.querySerialize({username})
        fetch(process.env.API_BASE+'delete-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).send('error in connecting to api').end()
        })
    }else{
        res.status(400).send('missing required params username!').end()
    }
});
router.post('/lock/:username',(req,res)=>{
    const username=req.params.username
    const token=req.headers.token
    if(username ) {
        const query=helper.querySerialize({username})
        fetch(process.env.API_BASE+'lock-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).send('error in connecting to api').end()
        })
    }else{
        res.status(400).send('missing required params username!').end()
    }

});
router.post('/unlock/:username',(req,res)=>{
    const username=req.params.username
    const token=req.headers.token
    if(username ) {
        const query=helper.querySerialize({username})
        fetch(process.env.API_BASE+'unlock-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).send('error in connecting to api').end()
        })
    }else{
        res.status(400).send('missing required params username!').end()
    }

});
router.post('/renew-user/:username',(req,res)=>{
    const username=req.params.username;
    const token=req.headers.token;
    if(username ) {
        const body=req.body;
        const query=helper.querySerialize({username:username,exdate:body.date})
        fetch(process.env.API_BASE+'renew-user?'+ query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(401).send('error in connecting to api').end()
        })
    }else{
        res.status(400).send('missing required params username!').end()
    }


});
router.post('/change-password/:username',(req,res)=>{
    const username=req.params.username;
    const token=req.headers.token;
    if(username ) {
        const query=helper.querySerialize({username})
        fetch(process.env.API_BASE+'change-passwd-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).send(JSON.stringify(response)).end()
        }).catch(err=>{
            res.status(401).send('error in connecting to api').end()
        })
    }else{
        res.status(400).send('missing required params username!').end()
    }
})

router.post('/generate',(req,res)=>{
    const body=req.body
    const token=req.headers.token;
    if(body){
        const query=helper.querySerialize({
            multi:body.g_concurrent_user,
            exdate:body.g_expiration_date,
            count:body.g_count
        });
        fetch(process.env.API_BASE+'user-gen?'+query,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(JSON.stringify({error:response.detail})).end()
            }else{
                res.status(200).send(JSON.stringify(response)).end()
            }
        }).catch(err=>{
            res.status(400).send('error in connecting to api!').end()
        })
    }else{
        res.status(400).send('missing required body!').end()
    }

})






//// online user page
router.get('/online-list',(req,res)=>{
    const token=req.headers.token
    fetch(process.env.API_BASE+'active-user',{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
    }).then(response=>response.json()).then(response=>{
        console.log(response)
        res.status(200).send(JSON.stringify({
            titles:['#','Username','IP Address','Management'],
            rows:response.map((item,index)=>{
                return {
                    user:item,
                    ip:'',
                    uid:index+1
                }
            })
        })).end()
    }).catch(err=>{
        res.status(400).send('error in connecting to api!').end()
    })
})
router.post('/kill-online/:username',(req,res)=>{
    const username=req.params.username
    const token=req.headers.token
    if(username){
        const query=helper.querySerialize({username})
        fetch(process.env.API_BASE+'kill-user?'+query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            res.status(200).end()
        }).catch(err=>{
            res.status(400).send('error in connecting to api!').end()
        })
    }else{
        res.status(400).send('missing required params username!').end()
    }
})
router.delete('/kill-several',(req,res)=>{
    const usernames=req.query.username
    const token=req.headers.token
    if(usernames){
        fetch(process.env.API_BASE+'del-kill-users?mode=kill',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(usernames)
        }).then(response=>response.json()).then(response=>{
            if(response){
                res.status(200).end()
            }else{
                res.status(401).send('error in inputs!').end()
            }
        }).catch(err=>{
            res.status(401).send('error in connecting to api!').end()
        })
    }else{
        res.status(400).send('missing required query username!').end()
    }

})

module.exports=router