// 侧栏工具
<template>
  <aside class="user-side">
    <div class="user-side_cell">
      <img src="../assets/images/icon1.png" alt="qr">
      <p>扫一扫下载APP</p>
    </div>
     <div class="user-side_cell">
       <a>
      <img src="../assets/images/icon1.png" alt="qr">
      <p>联系客服</p>
       </a>
    </div>
     <div class="user-side_cell">
       <a>
      <img src="../assets/images/icon2.png" alt="qr">
      <p>帮助中心</p>
      </a>
    </div>
  </aside>

</template>
<script>
export default {
  mounted(){

  }
}
</script>
<style lang="scss">
.user-side {
  position: absolute;
  top: 0;
  right: -.58rem;
  transform: translateX(100%);
  background: #fff;
  .user-side_cell {
    width: 6.33rem;
    padding: 0.75rem;
    border-bottom: 1px solid rgb(228, 231, 237);
      text-align: center;
    > a {
      display: block;
    }
    a:not(:hover){
      color: rgb(96, 98, 102);
    }
  }
}
</style>
