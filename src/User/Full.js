import server from '../utils/request'

export function getGoodsList(obj){
    return server({
        method:"GET",
        url:`/api/manage/product/list?pageNum=${obj.pageNum}&pageSize=${obj.pageSize}`,
        query:obj
    })
}

export function UpGoodsList(obj){
    return server({
        method:"post",
        url:"/api/manage/product/updateStatus",
        data:obj
    })
}

export function GetSearch(obj){
    return server({
        method:"get",
        url:"/api/manage/product/search",
        params:{...obj}
    })
}

export function getClass(obj){
    return server({
        method:"get",
        url:`/api/manage/category/info?categoryId=${obj.categoryId}`,
        query:obj
    })
}

export function getGoodList(obj){
    return server({
        method:"GET",
        url:`/api/manage/category/list`,
        query:obj
    })
}

export function AddGoods(obj){
    return server({
        method:"POST",
        url:"/api/manage/product/add",
        data:obj
    })
}

export function UpGoods(obj){
    return server({
        method:"post",
        url:"/api/manage/product/update",
        data:obj
    })
}