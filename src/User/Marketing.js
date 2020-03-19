import server from '../utils/request'

export function getGoodList(obj){
    return server({
        method:"GET",
        url:`/api/manage/category/list?pageNum=${obj.pageNum}&pageSize=${obj.pageSize}&parentId=${obj.parentId}`,
        query:obj
    })
}

export function addListOne(obj){
    return server({
        method:"POST",
        url:"/api/manage/category/add",
        data:obj
    })
}

export function ChangeListOne(obj){
    return server({
        method:"POST",
        url:"/api/manage/category/update",
        data:obj
    })
}