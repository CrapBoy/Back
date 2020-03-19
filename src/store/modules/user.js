import { CHANGEUSERINFO } from '../mutation-type'

var User ={
    state:{
        userInfo:{
            username:"",
            img:""
        }
    },
    mutations:{
        [CHANGEUSERINFO](state,userObj){
            state.userInfo.username=userObj.username
        }
    }
}

export default User