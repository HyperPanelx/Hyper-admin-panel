module.exports = function (options) {
    return function (req, res, next) {
        if(req.originalUrl==='/api/auth/login'){
            next()
        }else{
            const apiKey=req.headers.authorization
            if(apiKey===process.env.API_KEY ){
                next()
            }else{
                res.status(401).send('missing api key!')
            }
        }

    }
}