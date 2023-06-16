const fetch=require('node-fetch');
const express=require('express');
const router=express.Router();
const helper=require('../helper')



//// users list table
router.get('/list', (req,res)=>{
    const token=req.headers.token
    fetch(process.env.API_BASE+'get-users?mode=all',{
        headers:{
            'Content-type':'application/json',
            Authorization:`Bearer ${token}`
        }
    }).then(response=>response.json()).then(response=>{
        if(response.detail){
            res.status(200).send(helper.responseHandler(true,response.detail,null))
        }else{
            res.status(200).send(helper.responseHandler(false,null,{
                titles:['user info','traffic','User limitation','Contact info','Date','status','operation'],
                rows:response.map((item,index)=>{
                    return {...item,uid:index+1}
                })
            }))
        }
    }).catch(err=>{
        res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
    })

})

//// create user
router.post('/create',(req,res)=>{
    const token=req.headers.token;
    const body=req.body;
    if(body.username && body.concurrent_user>0 && body.expiration_date && body.telegram_id && body.phone){
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
                res.status(200).send(helper.responseHandler(false,null,response)).end()
            }else{
                res.status(200).send(helper.responseHandler(true,'The Username already exist!',null)).end();
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null)).end();
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username , concurrent user,expiration date,telegram id and phone are required',null));
    }
})

//// generate user
router.post('/generate',(req,res)=>{
    const body=req.body
    const token=req.headers.token;
    if(body.g_concurrent_user>0 && body.g_expiration_date && body.g_count>0){
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
                res.status(200).send(helper.responseHandler(true,response.detail,null)).end();
            }else{
                res.status(200).send(helper.responseHandler(false,null,response)).end()
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null)).end();
        })
    }else{
        res.status(200).send(helper.responseHandler(true,' concurrent user , expiration date and count are required!')).end()
    }

});

//// delete several user
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
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'usernames are required!',null))
    }
});

//// delete user
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
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username is required!',null))
    }
});


//// lock user
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
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username is required!',null))
    }

});

//// unlock user
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
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username is required!',null))
    }

});


//// renew user
router.post('/renew-user/:username',(req,res)=>{
    const username=req.params.username;
    const token=req.headers.token;
    const body=req.body;
    if(username && body.date) {
        const query=helper.querySerialize({username:username,exdate:body.date})
        fetch(process.env.API_BASE+'renew-user?'+ query,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username and new exp date are required!',null))
    }


});

//// change password
router.post('/change-password/:username',(req,res)=>{
    const username=req.params.username;
    const token=req.headers.token;
    if(username ) {
        const query=helper.querySerialize({mode:'users',username})
        fetch(process.env.API_BASE+'change-passwd-user?'+query,{
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
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username is required!',null))
    }
})


//// get user detail
router.get('/detail',(req,res)=>{
    const username=req.query.username;
    const token=req.headers.token;
    if(username){
        fetch(process.env.API_BASE+`get-users?mode=username&username=${username}`,{
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }).then(response=>response.json()).then(response=>{
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                const {user,telegram_id,phone,email,traffic,multi}=response;
                const idx=traffic.indexOf('G')===-1 ?  traffic.indexOf('M') : traffic.indexOf('G');
                res.status(200).send(helper.responseHandler(false,null,{
                    username:user,
                    telegram_id:telegram_id,
                    phone:phone===0 ? '' : phone,
                    email:email,
                    multi:multi,
                    traffic:{
                        num:traffic ? Number(traffic.slice(0,idx-1)) : '',
                        unit:traffic.includes('Gigabyte') ? 'Gigabyte' : traffic.includes('Megabyte') ? 'Megabyte' : 'Gigabyte'
                    }
                }));
            }

        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })

    }else{
        res.status(200).send(helper.responseHandler(true,'username is required!',null))
    }

});


//// edit user
router.put('/edit',(req,res)=>{
    const token=req.headers.token;
    const body=req.body
    if(body.e_username && body.e_telegram_id && body.e_phone && body.e_email && body.e_concurrent_user>0 && body.e_traffic && body.e_traffic_unit){
        const query=helper.querySerialize({
            username:body.e_username,
            telegram_id :body.e_telegram_id,
            phone:body.e_phone,
            email:body.e_email,
            multi:body.e_concurrent_user,
            traffic:body.e_traffic ? `${body.e_traffic} ${body.e_traffic_unit}` : ''
        })
        fetch(process.env.API_BASE+'change-detail?'+query,{
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${token}`
            }
        }).
        then(response=>response.json()).
        then(response=>{
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username, telegram id, phone, email, concurrent user and traffic are required!',null))
    }

})


//// get online user list table
router.get('/online-list',(req,res)=>{
    const token=req.headers.token
    fetch(process.env.API_BASE+'active-user',{
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
        },
    }).then(response=>response.json()).then(response=>{
        if(response.detail){
            res.status(200).send(helper.responseHandler(true,response.detail,null))
        }else{
            res.status(200).send(helper.responseHandler(false,null,{
                titles:['#','Username','IP Address','Management'],
                rows:response.map((item,index)=>{
                    return {
                        user:item,
                        ip:'',
                        uid:index+1
                    }
                })
            }))
        }
    }).catch(err=>{
        res.status(400).send('error in connecting to api!').end()
    })
})

//// kill several user
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
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'usernames are required!',null))
    }

})

//// kill user
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
            if(response.detail){
                res.status(200).send(helper.responseHandler(true,response.detail,null))
            }else{
                res.status(200).send(helper.responseHandler(false,null,null))
            }
        }).catch(err=>{
            res.status(200).send(helper.responseHandler(true,'error in connecting to api!',null))
        })
    }else{
        res.status(200).send(helper.responseHandler(true,'username is required!',null))
    }
})


module.exports=router