<template>
  <el-container style="height:753px;">
    <el-aside width="200px" style="background-color: rgb(43, 46, 51)">
      <div class="TopText">mm后台系统</div>
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" class="left"  @click="GoWant('menu')">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>商品</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="GoWant('marketing')"><i class="el-icon-s-marketing"></i>品类管理</el-menu-item>
              <el-menu-item index="2-2" @click="GoWant('full')"><i class="el-icon-shopping-cart-full"></i>商品管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="GoWant('custom')" ><i class="el-icon-s-custom"></i>用户管理</el-menu-item>
              <el-menu-item index="2-2" @click="GoWant('setting')" ><i class="el-icon-setting"></i>权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>订单</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="GoWant('outline')" ><i class="el-icon-phone-outline"></i>订单管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="NameBox">{{username}}</span>|
        <button class="emitBtn" @click="EmitBtn">退出登陆</button>
      </el-header>

      <el-main>
          <div class="Main-cont">
               <router-view></router-view>
          </div>
         
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  methods: {
    GoWant(type) {//路由跳转
      console.log(type);
      if(type=="menu"){
           this.$router.push("/index/menu")//首页
      }else if(type=="marketing"){
          this.$router.push("/index/marketing")//品类管理
      }else if(type=="full"){
          this.$router.push("/index/full")//商品管理
      }else if(type=="custom"){
          this.$router.push("/index/custom")//用户管理
      }else if(type=="setting"){
          this.$router.push("/index/setting")//权限管理
      }else if(type=="outline"){
          this.$router.push("/index/outline")//订单管理
      }
    },
    EmitBtn(){
           this.$confirm('此操作将退出登陆，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          sessionStorage.removeItem("username")
          this.$router.push("/")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
      }
  },
  computed: {
    username: function() {
      // return this.$store.state.User.userInfo.username;
      return sessionStorage.getItem("username")
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5)
}

.el-aside {
  color: #333;
}
.left {
  margin-left: -80px;
}
.el-menu-item {
  background-color: rgb(43, 46, 51) !important;
}
.el-submenu > div {
  margin-left: -80px;
  background-color: rgb(43, 46, 51) !important;
}

.el-menu-item-group__title {
  background-color: rgb(43, 46, 51) !important;
  margin-top: -20px;
}
.TopText {
  height: 50px;
  color: #ffffff;
  line-height: 50px;
}
.Main-cont{
    height: auto;
    border-radius: 5px;
    width: 97%;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5)
}
.NameBox{
  margin-right: 10px;
  font-size: 16px
}
.emitBtn{
  border: 0;
  margin-right: 20px;
  margin-left: 10px;
  line-height: 10px;
  outline: none;
  background-color: #fff;
  color: #409eff;
  width: 60px;
  height: 20px;
  padding: 5px 2px
}
</style>