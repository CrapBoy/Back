<template>
<div>
  <!-- 商品详情 -->
  <div v-if="show==='3'" >
      <el-page-header @back="full_goBack" content="商品详情"></el-page-header>
       <div class="p_detail">
        <div class="p_detailInfo">
          <span class="el-tag el-tag--light sizeText">商品名称</span>
          <span class="detail_span">{{GoodsInfo.name}}</span>
        </div>

        <div class="el-divider el-divider--horizontal"><div class="el-divider__text is-center"><i class="el-icon-shopping-cart-full"></i></div></div>
        
        <div class="p_detailInfo">
            <span class="el-tag el-tag--light sizeText">商品描述</span>
            <span class="detail_span">{{GoodsInfo.desc}}</span>
          </div>
          
        <div class="el-divider el-divider--horizontal"><div class="el-divider__text is-center"><i class="el-icon-chat-line-round"></i></div></div>
           <div class="p_detailInfo">
            <span class="el-tag el-tag--light sizeText">商品价格</span>
            <span class="detail_span">{{GoodsInfo.price}}</span>
          </div>
      <div class="el-divider el-divider--horizontal"><div class="el-divider__text is-center"><i class="el-icon-money"></i></div></div>
           <div class="p_detailInfo imgsBoxFull">
            <span class="el-tag el-tag--light sizeText sizeTextOne">商品图片</span>
            <div class="demo-image  imgbox_full">
            <div class="block  imgbox_fu" v-for="(item,index) in GoodsInfo.imgs" :key="index">
              <el-image
                style="width: 100px; height: 100px"
                :src=url+item>
                </el-image>
            </div>
          </div>
          </div>
      <div class="el-divider el-divider--horizontal"><div class="el-divider__text is-center"><i class="el-icon-folder-opened"></i></div></div>
        <div class="p_detailInfo">
            <span class="el-tag el-tag--light sizeText">所属分类</span>
            <span class="detail_span">{{dataname}}</span>
          </div>
      <div class="el-divider el-divider--horizontal"><div class="el-divider__text is-center"><i class="el-icon-picture-outline"></i></div></div>
           <div class="p_detailInfo">
            <span class="el-tag el-tag--light sizeText">商品详情</span>
            <span class="detail_span" v-html="GoodsInfo.detail"></span>
          </div>
      <div class="el-divider el-divider--horizontal"><div class="el-divider__text is-center"><i class="el-icon-set-up"></i></div></div>
      
      
      
      
      
      
      
      
      </div>
  </div>

 <!-- 主页面 -->
  <div class="Full-Top" v-if="show==='1'">
    <div class="Full-TopMain">
      <!-- 选择框 -->
      <el-select v-model="value" class="FUllinput">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- 搜索框 -->

      <el-input v-model="input" placeholder="关键字" class="FUllinput"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="Full_search">搜索</el-button>
    </div>
    <!-- 右边搜索 -->
    <div>
      <el-button type="primary" icon="el-icon-plus" @click="AddGood">添加商品</el-button>
    </div>
  </div>
<template v-if="show==='1'" >
  <el-table :data="tableData" height="345" border style="width: 100%" class="Full-Main"> 
    <el-table-column prop="name" label="商品名称" width="280"> </el-table-column>
    <el-table-column prop="desc"  label="商品描述"  width="380"> </el-table-column>
    <el-table-column  prop="price"  label="商品价格" width="200"> </el-table-column>
    <el-table-column  prop="status"  label="商品状态" width="180" >
        <template slot-scope="scope">
        <div>
          <div v-if="scope.row.status" >
          <el-button size="mini"  @click="isUp(scope.$index, scope.row)">下架</el-button>
          <span class="isUP">销售中</span>
      </div>
      <div v-else>
        <el-button size="mini"  @click="isUp(scope.$index, scope.row)">上架</el-button>
         <span class="isUP">已下架</span>
      </div>
          </div>
        </template>
      </el-table-column>
    <el-table-column  prop="option"  label="操作选项" width="200">
        <template slot-scope="scope">
        <div>
          <el-button size="mini"  @click="MainInfo(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini"  @click="Mainchage(scope.$index, scope.row)">修改</el-button>
        </div>
        </template>
      </el-table-column>
 </el-table>
</template>

  <div v-if="show==='1'">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="prev, pager, next" :total=2*total></el-pagination>
  </div>


  <div class="Full-MainBox" v-else-if="show==='2'">
    <p class="Full_p"><i class="el-icon-back icon-addGoods" @click="BackFull"></i><span class="Full-AddGoodsBtn">添加商品</span></p>
    <!-- 内容区 -->
    <div>
      <el-form :model="GoodsList" ref="ruleForm">
        <!-- 商品名称 -->
        <el-form-item  label="商品名称" prop="name" class="full_label">
        <el-input type="text" v-model="GoodsList.name" class="Full_input"></el-input>
        <!-- {{GoodsList.name}} -->
      </el-form-item>
      <!-- 商品描述 -->
      <el-form-item  label="商品描述" prop="name">
        <el-input type="textarea" v-model="GoodsList.desc" class="Full_input"></el-input>
        <!-- {{GoodsList.desc}} -->
      </el-form-item>
      <!-- 商品价格 -->
      <el-form-item  label="商品价格" prop="name">
        <el-input type="Number" v-model="GoodsList.price" class="Full_input"></el-input>
        <!-- {{GoodsList.price}} -->
      </el-form-item>
      <!-- 商品分类 -->
      <template>
         <el-form-item  label="商品分类" prop="name">
          <el-select v-model="GoodsList.categoryId" placeholder="请选择">
            <el-option
              v-for="item in option"
              :key="item._id"
              :value="item._id"
              :label="item.name">
            </el-option>
          </el-select>
          <!-- {{GoodsList.categoryId}} -->
         </el-form-item>
      </template>
       <!-- 图片上传 -->
       <el-form-item  label="图片上传" prop="name">
       <el-upload
          class="avatar-uploader"
          action="http://118.24.25.7:5000/manage/img/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

       <el-form-item  label="商品描述" prop="name">
      
      <!-- 富文本 -->
         <div id="editor" class="RichText" >
         
         </div>
         <!-- {{GoodsList.editorContent}} -->
      </el-form-item>

     <el-button type="primary" @click="SureSubmit">确认提交</el-button>
     <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form>

   
    </div>
    <!-- 内容区 -->
  </div>
</div>
</template>

<script>
import  { getGoodsList, UpGoodsList, GetSearch, getClass, getGoodList, AddGoods } from '../User/Full'
export default {
  data() {
    return {
      
      options: [
        {
          value: "1",
          label: "按名称搜索"
        },
        {
          value: "2",
          label: "按描述搜索"
        },
      ],
      option:[],
      //上面返回的数据
      GoodsList:{
            categoryId:"",
            pCategoryId :"",
            name:"",
            desc:"",
            price:"",
            detail:"",
            status: 0,
            imgs:[],
            value:"",
            editorContent:"",
      },
      url:"http://118.24.25.7:5000/upload/",
      editorContent: '',
      dataname:"123234",
      fits: ['fill'],
      GoodsInfo:{},
      show:"1",
      value: "",
      input: "",
      pageNum:1,
      pageSize:5,
      total:0, 
      imageUrl: '',//上传图片地址
      tableData: [],
    };
  },
  methods:{
    //请求数据
    getData(){
      getGoodsList({pageNum: this.pageNum, pageSize: this.pageSize}).then(res=>{
        if(res.data.status==0){
          this.total=res.data.data.total
          this.tableData=res.data.data.list
        }
      })
    },
    //是否上架
    isUp(index, row){
      let obj={
        productId: row._id,
        status: !row.status
      }
      UpGoodsList(obj).then(res=>{
        if(res.data.status==0){
          // console.log(res)
        }
      })
      this.getData()
      this.$message({
          message: '恭喜你，修改成功',
          type: 'success'
        });
    },
     // 搜索
    Full_search(){
      if(this.value==1){
      let obj={
        pageNum: this.pageNum, 
        pageSize: this.pageSize,
        productName :this.input,
        productDesc:""
      }
      GetSearch(obj).then(res=>{
        this.tableData=res.data.data.list
        console.log(res.data.data.list)
        this.total=res.data.data.total
      })
    }else if(this.value==2){
        let obj={
        pageNum: this.pageNum, 
        pageSize: this.pageSize,
        productDesc :this.input,
        productName :"",
      }
        GetSearch(obj).then(res=>{
        this.tableData=res.data.data.list
      })
    }
    },
    //添加商品页面
    AddGood(){
      this.show="2"
      //发送请求获取所有的分类
      getGoodList().then(res => {
      this.option=res.data.data.list;
      this.drawPain()
    }
      );
    },
    //确认添加商品
    SureSubmit(){
      let obj = {
        categoryId: this.GoodsList.categoryId,
        pCategoryId: 0,
        name:this.GoodsList.name,  
        desc:this.GoodsList.desc,      
        price:this.GoodsList.price,       
        detail:this.GoodsList.editorContent,    
        imgs: this.GoodsList.imgs,      
        }  
      console.log(obj)
      AddGoods(obj).then(res=>{
        console.log(res)
        if(res.data.status==0){
          this.$message({
          message: '添加成功',
          type: 'success'
        });
         this.GoodsList={},
         this.show="1"
        }
          
          
      })
    },
     resetForm() {
        this.GoodsList={}
      },
    //商品详情
    MainInfo(index, row){
      this.show="3",
      this.GoodsInfo=row
    // 发送请求获取分类
        getClass({categoryId:row.categoryId}).then(res=>{
            this.dataname=res.data.data.name
        })
    },
    Mainchage(index, row){
      // console.log(index, row)
      this.$router.push({path:"/index/changeGoods",query:row})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum=val
      this.getData()
    },
    BackFull(){
      this.show="1"
    },
    //图片上传
    handleAvatarSuccess(res, file) {
      console.log(file)
      this.imageUrl = URL.createObjectURL(file.raw);
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //绘制富文本
    drawPain(){
      var E = require('wangeditor')  // 使用 npm 安装
      var editor = new E('#editor')
       editor.customConfig.onchange = (html) => {
          this.GoodsList.editorContent = html
        }
      editor.create()
    },
    full_goBack() {
        this.show="1"
      }
  },
  mounted(){
    this.getData()
    this.drawPain()
  },
  computed:{
    // status:function(){
    //   this.tableData.status = this.tableData.status.fliter(el=>{
    //   return el.status
    //  })
    // }
    name:function(){
       return this.GoodsInfo.name
    }
  }
  
}

</script>

<style>
.Full-Top {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.FUllinput{
    width: 30% !important;
}
.Full-TopMain{
    display: flex;
    width: 400px;
    justify-content: space-around
}
.Full-Main{
  margin-top: 20px;
}
.Full-MainBox{
  text-align: left;
  height: 1200px;
  line-height: 40px;
  font-weight: 500;
  position: relative;
}
.Full-AddGoodsBtn{
  margin-left: 10px;
  text-align: left;
  position: absolute;
  left: 30px;
}
.icon-addGoods{
  color: blueviolet;
  font-size: 24px;
  vertical-align: middle;
  position: absolute;
  margin-right: 30px;
  top: 8px;
}
.Full_p{
  height: 50px;
  border-bottom: 1px solid black
}
.Full_input{
  width: 94% !important;
}
.full_label{
  margin-top: 20px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .isUP{
    margin-left: 20px;
  }
  .Full_GoodsInfo{
    width: 100%;
    height: 80px;
    text-align: left !important;
  }
  .Full_GoodsInfo .Full_GoodsInfoBack{
    color: #409EFF;
    cursor: pointer;
  }
  .p_detail{
    margin-top: 30px;
  }
.p_detail>.p_detailInfo{
    margin-bottom: 10px;
    width: 520px;
    text-align: left
  }
  /* .p_detail>.p_detailInfo>span{
    margin-right: 158px;
  } */
  .sizeText{
    font-size: 16px !important;
    margin-right: 20px;
  }
  .sizeTextOne{
     margin-top: 30px;
  }
  .imgbox_full{
    display: flex;
    position: absolute;
    top: 0px;
    left: 100px;
  }
  .imgbox_fu{
    margin-right: 30px;
  }
  .imgsBoxFull{
    height: 100px;
    position: relative;
  }
  .RichText{
    margin-top: 50px;
  }
</style>