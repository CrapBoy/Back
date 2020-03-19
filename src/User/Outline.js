import server from '../utils/request'

export function getOrderList(obj){
    return server({
        method:"GET",
        url:`/api/manage/order/list?pageNum=${obj.pageNum}&pageSize=${obj.pageSize}`,
        query:obj
    })
}


export function SearchOrderList(obj){
    return server({
        method:"GET",
        url:`/api/manage/order/search?pageNum=${obj.pageNum}&pageSize=${obj.pageSize}&type=${obj.type}&value=${obj.value}`,
        query:obj
    })
}

export function OrderInfo(obj){
    return server({
        method:"GET",
        url:"/api/manage/order/info",
        query:{...obj}
    })
}