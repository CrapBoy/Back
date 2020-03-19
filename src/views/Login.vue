<template>
<div class="Back-Box">
    <div class="TopBox"><h1>m'm后台管理系统</h1></div>
  <el-container>
    <div class="Login-Box">
      <h1>登陆</h1>
      <el-form :model="loginCheck" :rules="Checkrules" status-icon ref="loginFrom">
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginCheck.username"
            placeholder="请输入账号"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginCheck.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="Login-Btn" @click="onSubmit('loginFrom')">提交</el-button>
          <el-button type="primary" class="Login-Btn" @click="resetForm('loginFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-container>
  </div>
</template>

<script>
import { getLogin } from "../User/Login";

export default {
  data() {
    //失去焦点验证
    return {
      loginCheck: {
        username: "",
        password: ""
      },
      Checkrules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击验证
    onSubmit(loginFrom) {
      this.$refs[loginFrom].validate(valid => {
        if (valid) {

          //发异步请求
          getLogin(this.loginCheck).then(res => {
            //成功提示消息
            this.$message({
              showClose: true,
              message: "登陆成功",
              type: "success"
            });
            console.log(res.data.data.username)
            if (!res.data.status) {
            //   this.$store.commit("CHANGEUSERINFO", res.data.data);
              sessionStorage.setItem("username",res.data.data.username)
              this.$router.push("/index");
            }
          });
          
        } else {
          //错误提示消息
          this.$message({
            showClose: true,
            message: "账号或者密码错误",
            type: "error"
          });
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
.TopBox{
    position: absolute;
    width: 100%;
    height: 80px;
    line-height: 80px;
    background-color: #fff;
    opacity: 0.3;
}
.Back-Box{
     background: url("../../public/images/background.jpg") no-repeat;
     background-size: cover;
}
/* body{
    background: url("../../public/images/background.jpg") no-repeat;
    background-size: cover;
} */

.Login-Box {
  width: 400px;
  margin: 200px auto;
  padding: 20px 40px;
  margin-bottom: 275px;
  box-sizing: border-box;
  background-color: #fff;
  opacity: 0.9;
}
.Login-Box h1{
    margin-bottom: 20px;
}
.Login-Btn {
  width: 48%;
}
</style>