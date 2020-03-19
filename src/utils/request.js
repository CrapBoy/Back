import axios from 'axios';
//开始axios的配置

var server = axios.create({
    baseURL:'/',
    timeout:6000,
    headers:{
        'fine':1234
    }
})

export default server