<!--suppress ALL -->
<template>
  <div class="services product" :class="state_open(services.status)">
    <span class="status">
      {{status_text}}
    </span>
    <span class="icon"></span>
    <p class="summary">
      {{services.appName}}
    </p>
    <p class="hot">
      {{services.hot}}
    </p>
    <span class="btn">{{ btn_text }}<Icon type="arrow-right-c"></Icon></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status_text: '',
      btn_text: ''
    }
  },
  props: {
    services: {
      type: Object,
      required: true
    }
  },
  methods: {
    state_open: function (status) {
      if (status !== '01') {
        if (status === '03') {
          this.status_text = '申请中'
          this.btn_text = '查看审核状态'
          return 'application'
        } else if (status === '02') {
          this.status_text = '未开通'
          this.btn_text = '马上开通'
          return 'notopen'
        } else {
          this.status_text = '未开通'
          this.btn_text = '马上开通'
          return 'notopen'
        }
      } else {
        this.status_text = '已开通'
        this.btn_text = '立即前往'
        return 'open'
      }
    }
  }
}
</script>
<style scoped lang="scss">
  $primaryColor: #1686EA;
  @mixin icon_imgs ($bg1:"",$bg2:"",$bg3:"",$bg4:"",$bg5:"",$bg6:"")
  {
    .mechanism {
      .icon {
        background-image: url($bg1);
      }
    }
    .product {
      .icon {
        background-image: url($bg2);
      }
    }
    .account {
      .icon {
        background-image: url($bg3);
      }
    }
    .jurisdiction {
      .icon {
        background-image: url($bg4);
      }
    }
    .enterprise {
      .icon {
        background-image: url($bg5);
      }
    }
    .maptitude {
      .icon {
        background-image: url($bg6);
      }
    }
  }
  .content {
    a {
      &:nth-child(3n){
        .services {
          margin-right: 0;
        }
      }
    }
  }
  .services {
    float: left;
    width: 320px;
    height: 295px;
    margin: 0 59px 50px 0;
    padding: 44px 25px 0 35px;
    border: 1px solid #E4E9EE;
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    line-height: 1.1;
    &:nth-child(3n){
      margin-right: 0;
    }
    .status {
      position: absolute;
      top: -1px;
      right: 20px;
      width: 27px;
      height: 60px;
      text-align: center;
      font-size: 14px;
      padding-top: 5px;
      color: #FFF;
      background: url("../assets/images/servicesnotopen.png") no-repeat center top;
      background-size: contain;
    }
      .icon {
      width: 52px;
      height: 58px;
      display: block;
      margin: 0 auto;
      margin-bottom: 25px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .summary {
      color: #606266;
      font-size: 24px;
      line-height: 1;
      margin-bottom: 17px;
      text-align: center;
    }
    .hot {
      height: 45px;
      color: #81878E;
      font-size: 14px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .btn {
      display: block;
      border: 2px solid #E4E7ED;
      heigt: 44px;
      line-height: 40px;
      position: relative;
      font-weight: bold;
      font-size: 16px;
      color: #606266;
      text-align: center;
      border-radius: 22px;
      i {
        position: absolute;
        top: 12px;
        right: 10px;
        color: #E4E7ED;
      }
    }
  }
  @include icon_imgs(
    $bg1:"../assets/images/services2.png",
    $bg2:"../assets/images/services1.png",
    $bg3:"../assets/images/services5.png",
    $bg4:"../assets/images/services4.png",
    $bg5:"../assets/images/services3.png",
    $bg6:"../assets/images/services6.png"
  );

  .open{
    @include icon_imgs(
    $bg1:"../assets/images/services22.png",
    $bg2:"../assets/images/services11.png",
    $bg3:"../assets/images/services55.png",
    $bg4:"../assets/images/services44.png",
    $bg5:"../assets/images/services33.png",
    $bg6:"../assets/images/services66.png"
    )
    .summary{
      color:$primaryColor
    }
    .btn{
      background-color:$primaryColor;
      color: #fff;

    i{
      color: #fff;
    }
    }
    &:hover{
       background:rgba(248,251,253,1);
       border-color:$primaryColor;
     }
    .status{
    background-image:url("../assets/images/servicesopen.png");
    }
  }
  .notopen {
    &:hover{
      background:rgba(248,251,253,1);
      .btn{
        border-color:$primaryColor;
        background-color:#fff;
        color: $primaryColor;
        i{
          color: $primaryColor;
        }
      }
    }
    .status {
      background-image: url("../assets/images/servicesnotopen.png");
    }
  }
  .application {
    &:hover{
      background:rgba(248,251,253,1);
      .btn{
        border-color:$primaryColor;
        background-color:#fff;
        color: $primaryColor;
        i{
          color: $primaryColor;
        }
      }
    }
    .status {
      background-image: url("../assets/images/servicesapply.png");
    }
  }
</style>
