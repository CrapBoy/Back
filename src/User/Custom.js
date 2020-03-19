import server from '../utils/request'

export function getUserList(obj){
    return server({
        method:"GET",
        url:`/api/manage/user/list?pageNum=${obj.pageNum}&pageSize=${obj.pageSize}`,
        query:obj
    })
}

export function DeleteUser(obj){
    return server({
        method:"POST",
        url:"/api/manage/user/delete",
        data:obj
    })
}

export function AddUser(obj){
    return server({
        method:"POST",
        url:"/api/manage/user/add",
        data:obj
    })
}


export function UpdateUser(obj){
    return server({
        method:"POST",
        url:"/api/manage/user/update",
        data:obj
    })
}