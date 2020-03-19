<template>
  <div>
    <!-- 上方 -->
    <div>
      <el-page-header @back="goBack" content="订单详情"></el-page-header>
    </div>
    <!-- 详情 -->
    <div>
      <div class="p_detail">
        <div class="p_detailInfo">
          <span class="el-tag el-tag--light orderText">订单号</span>
          <span class="detail_span">{{this.$route.query.orderId}}</span>
        </div>

        <div class="p_detailInfo">
          <span class="el-tag el-tag--light orderText">订单人</span>
          <span class="detail_span">{{this.$route.query.recipient}}</span>
        </div>

        <div class="p_detailInfo">
          <span class="el-tag el-tag--light orderText">创建时间</span>
          <span class="detail_span">{{ new Date(this.$route.query.create_time).toLocaleString() }}</span>
        </div>

        <div class="p_detailInfo">
          <span class="el-tag el-tag--light orderText">订单状态</span>
          <span class="detail_span">{{status}}</span>
        </div>

        <div class="p_detailInfo">
          <span class="el-tag el-tag--light orderText">商品价格</span>
          <span class="detail_span">￥{{this.$route.query.allPrice}}元</span>
        </div>

        <div class="p_detailInfo">
          <span class="el-tag el-tag--light orderText">支付方式</span>
          <span class="detail_span">{{method}}</span>
        </div>
      </div>
    </div>

    <div class="el-divider el-divider--horizontal">
      <div class="el-divider__text is-center">
        <i class="el-icon-shopping-cart-full"></i>
      </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="imgs" label="商品图片" width="280">
        <div class="demo-image">
          <div class="block" v-for="fit in imgs" :key="fit">
            <el-image style="width: 100px; height: 100px" :src=url+fit ></el-image>
          </div>
        </div>
      </el-table-column>
      <el-table-column prop="info" label="商品信息" width="380"></el-table-column>
      <el-table-column prop="price" label="单价" width="280">
          <template slot-scope="scope">
              ￥{{scope.row.price}}
          </template>
      </el-table-column>
      <el-table-column prop="count" label="数量" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      method: "",
      status: "1",
      tableData: this.$route.query.details,
      fits: ['fill'],
      imgs:[],
      url: 'http://118.24.25.7:5000/upload/'
    };
  },
  methods: {
    goBack() {
      this.$router.push("/index/outline");
    },
    Paymethod() {
      let Pm = this.$route.query.paymentMethod;
      if (Pm == 1) {
        this.method = "支付宝";
      } else if (Pm == 2) {
        this.method = "微信";
      } else {
        this.method = "银联";
      }
    },
    OrderStatus() {
      let st = this.$route.query.status;
      if (st == 1) {
        this.status = "未完成";
      } else if (st == 2) {
        this.status = "已完成";
      } else {
        this.status = "已取消";
      }
    }
  },
  mounted() {
    console.log(this.$route.query.details);
    this.Paymethod();
    this.OrderStatus();
    this.imgs=this.$route.query.details[0].imgs;
  }
};
</script>

<style>
.orderText {
  width: 80px;
  height: 20px !important;
  line-height: 20px !important;
  text-align: center;
  margin-right: 30px;
}
</style>