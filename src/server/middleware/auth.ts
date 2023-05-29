
export default defineEventHandler( ev=>{
    const headerToken=ev.node.req.headers.authorization
    const {public:{internalApiKey}}=useRuntimeConfig()
    const url:string|undefined=ev.node.req.url
    if(
        url==='/api/server' ||
        url==='/api/me'  ||
        url==='/api/logout' ||
        url==='/api/login' ||
        url==='api/users/status' ||
        url==='api/users/list' ||
        url==='api/users/create'

    ){
        if(headerToken!==internalApiKey){
            return createError({
                statusCode:501,
                statusMessage:'unauthorized token!'
            })
        }
    }

})