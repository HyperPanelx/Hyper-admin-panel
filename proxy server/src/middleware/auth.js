module.exports = function (options) {
    return function (req, res, next) {
        if(req.originalUrl==='/api/auth/login'){
            next()
        }else{
            const token=req.headers.authorization
            if(token===process.env.API_KEY){
                next()
            }else{
                res.status(401).send('missing api key!')
            }
        }

    }
}