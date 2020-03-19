<template>
  <div class="Full-MainBox">
    <p class="Full_p">
      <i class="el-icon-back icon-addGoods" @click="BackFull"></i>
      <span class="Full-AddGoodsBtn">返回</span>
    </p>
    <!-- 内容区 -->
    <div>
      <el-form :model="GoodsList" ref="ruleForm">
        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="name" class="full_label">
          <el-input type="text" v-model="GoodsList.name" class="Full_input"></el-input>
          <!-- {{GoodsList.name}} -->
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述" prop="name">
          <el-input type="textarea" v-model="GoodsList.desc" class="Full_input"></el-input>
          <!-- {{GoodsList.desc}} -->
        </el-form-item>
        <!-- 商品价格 -->
        <el-form-item label="商品价格" prop="name">
          <el-input type="Number" v-model="GoodsList.price" class="Full_input"></el-input>
          <!-- {{GoodsList.price}} -->
        </el-form-item>
        <!-- 商品分类 -->
        <template>
          <el-form-item label="商品分类" prop="name">
            <el-select v-model="GoodsList.name" placeholder="请选择">
              <el-option
                v-for="item in option"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
            <!-- {{GoodsList.id}} -->
          </el-form-item>
        </template>
        <!-- 图片上传 -->
        <el-form-item label="图片上传" prop="name">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品描述" prop="name">
          <!-- 富文本 -->
          <div id="editor" class="RichText" v-if="show=='2'" v-html="GoodsList.detail">
            
          </div>
          <!-- {{GoodsList.editorContent}} -->
        </el-form-item>

        <el-button type="primary" @click="SureSubmit">确认修改</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form>
    </div>
    <!-- 内容区 -->
  </div>
</template>


<script>
import { getGoodList, getClass, UpGoods } from "../User/Full";
export default {
  data() {
    return {
      option: [],
      //上面返回的数据
      GoodsList: {
        categoryId: "",
        pCategoryId: "",
        name: "",
        desc: "",
        price: "",
        detail: "",
        status: 0,
        imgs: [],
        value: "",
        editorContent: ""
      },
      url: "http://118.24.25.7:5000/upload/",
      editorContent: "",
      dataname: "123234",
      fits: ["fill"],
      GoodsInfo: {},
      show: "1",
      value: "",
      input: "",
      pageNum: 1,
      pageSize: 5,
      total: 0,
      imageUrl: "", //上传图片地址
      tableData: []
    };
  },
  methods: {
    AddGood() {
      this.show = "2";
      //发送请求获取所有的分类
      getGoodList().then(res => {
        this.option = res.data.data.list;
        this.drawPain();
      });
    },
    //确认商品
    SureSubmit() {
      let obj = {
        _id: this.$route.query._id,
        categoryId: this.$route.query.categoryId,
        pCategoryId: this.$route.query.pCategoryId,
        name: this.GoodsList.name,
        desc: this.GoodsList.desc,
        price: this.GoodsList.price,
        detail: this.GoodsList.detail,
        imgs: this.GoodsList.imgs
      };
      UpGoods(obj).then(res => {
          if(res.data.status==0){
          this.$message({
          message: '修改成功',
          type: 'success' 
        });
         this.$router.push("/index/full");
          }
      });
    },
    resetForm() {
      this.GoodsList = {};
    },
    //商品详情
    MainInfo(index, row) {
      (this.show = "3"), (this.GoodsInfo = row);
      // 发送请求获取分类
      getClass({ categoryId: row.categoryId }).then(res => {
        this.dataname = res.data.data.name;
      });
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //返回上一级
    BackFull() {
    //   console.log(111);
      this.$router.push("/index/full");
    },
    drawPain() {
      var E = require("wangeditor"); // 使用 npm 安装
      var editor = new E("#editor");
      editor.customConfig.onchange = html => {
        this.GoodsList.editorContent = html;
      };
      editor.create();
    },
    full_goBack() {
      this.show = "1";
    }
  },
  mounted() {
    this.drawPain();
    this.AddGood();
    // console.log(this.$route.query);
    this.GoodsList = this.$route.query;
  }
};
</script>
