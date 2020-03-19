import server from '../utils/request'

export function getLogin(obj){
    return server({
        method:"post",
        url:"/api/login",
        data:obj
    })
}
