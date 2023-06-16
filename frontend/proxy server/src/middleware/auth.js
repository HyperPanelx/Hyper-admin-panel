const helper=require('../helper')

module.exports = function (options) {
    return function (req, res, next) {
        if(req.originalUrl==='/api/auth/login'){
            next()
        }else{
            const token=req.headers.token
            const apiKey=req.headers.authorization
            if(apiKey===process.env.API_KEY  && token){
                next()
            }else{
                res.status(401).send(helper.responseHandler(true,'missing api key or token!',null))
            }
        }

    }
}