<template>
    <div class="login_header">
          <table>
            <tr>
              <td class="logo">
                <router-link to="/login" replace>
                  <img src="../assets/images/lg_logo.png" alt="">
                </router-link>
              </td>
            </tr>
          </table>
          <div class="pull-right">
            <!--<a class="link" href="#">在线客服</a>-->
            <!--<a class="link" href="#">帮助中心</a>-->
            <router-link  style="margin-right:0" class="link" to="/register">注册</router-link> 
            &nbsp;|&nbsp;
            <router-link class="link" to="/login">登录</router-link>
            <span class="iphone">400-618-2090</span>
          </div>
        </div>
</template>
<script>
export default {
  methods: {
  }
}
</script>
