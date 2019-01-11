<template>
  <div id="app"  >
      <!-- header   -->
      <app-header/>
      <!-- header   end-->
      <!-- content -->
      <router-view/>
      <!-- content end-->
      <!-- footer -->
      <app-footer />
      <!-- footer end-->
  </div>  
</template>

<script>
import appFooter from './components/footer'
import appHeader from './components/header'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {}
  },
  components: {
    // Header,
    appFooter,
    appHeader
  }
}
</script>
<style lang="scss" src="@/assets/css/style.scss" ></style>
<style scoped lang="scss">
#app {
  height: 100%;
  overflow: auto;
  background: #f5f7fa;
  min-width: 1200px;
}
.pull-right {
  float: right;
  color: #999;
}
.org-about {
  width: 520px;
  height: 220px;
  position: fixed;
  right: 1px;
  bottom: 0;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  z-index: 2;
  .org-about_head {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  .org-about_list {
    padding-left: 30px;
    padding-right: 20px;
    height: 158px;
    overflow: auto;
    a {
      display: inline-block;
      vertical-align: middle;
    }
    a:not(:hover) {
      color: #333;
    }
    a {
      width: 76%;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
  }
}
</style>
