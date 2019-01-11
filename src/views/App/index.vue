<template>
  <div class="main--fluids portal" id="portal" ref="portal">
    <!-- content -->
    <div class="container" id="container" ref="container">

      <header class="app-head">
        <div style="display: inline-block">
          <p style="font-weight: bold;font-size: 24px;color: #373D41;float: left">应用中心</p>
          <i class="icon hx hx-hx_fenleiyingyongxiangmu" v-on:mouseenter="moveIn" :class="yse" v-on:mouseleave="moveOut" style="margin-left: 13px;font-size: 19px;cursor: pointer"></i>
        </div>
        <!--<span>{{app}}</span>-->
        <div v-if="app.org_name=='国家医保局'" style="display: inline-block;float: right;line-height: 28px" class="text--small text--ccc"><p style="float: left;margin-right: 10px">温馨提示：</p><i class="icon hx hx-hx_guo text--blue" style="float:left;font-size: 19px"></i><p style="float: left;margin-right: 50px">国字角标为国家医疗保障局专属应用</p></div>
      </header>
      <div style="position: absolute;z-index: 100;left: -18px;top: 60px;" v-if="showSis">
        <img src="../../assets/images/sisList.png" style="width: 1235px">
      </div>
      <!--<div class="kto">-->
        <!--<span class="circle"></span>-->
        <!--<span class="haveOpen">已开通</span>-->
      <!--</div>-->
      <!-- app list -->
      <ul class="flex list--unstyled app-list flex--wrap ">
        <!-- cell  -->
        <!--<li class="col&#45;&#45;4 app-cell" v-for="val of app.appData" :key="val.index">-->
          <!--<div class="app-cell_con flex  flex&#45;&#45;center flex&#45;&#45;column">-->
            <!--<div class="app-cell_img" v-if="val.logoFile">-->
              <!--<img :src="val.logoFile.url">-->
            <!--</div>-->
            <!--<h2>{{ val.name }}</h2>-->
            <!--<p class="app-cell_remark text&#45;&#45;small text&#45;&#45;ccc">{{ val.remark }}</p>-->
            <!--<a class="btn" @click='gotopage(val.url)' ><span class="btn_icon">→</span>立刻前往</a>-->
          <!--</div>-->
        <!--</li>-->
        <!--<span>{{apps}}</span>-->

        <li class="col--4 app-cell" v-if="apps!=1" v-for="item in apps.openApps">
          <!--<span>{{item}}</span>-->
          <div class="app-cell_con flex  flex--center flex--column coupoint" @click='gotopage(item.url)'>
            <i v-if="item.blc" class="icon hx hx-hx_guo text--blue iconsty"></i>
            <i v-else class="icon hx hx-hx_guo1 text--blue iconsty" style="height: 42px"></i>
            <!--<i class="icon hx  text&#45;&#45;blue" :class="item.icon" style=""></i>-->
            <div class="app-cell_img">
              <i class="icon hx  text--blue fontsst" :class="item.icon"></i>
            </div>
            <span class="h2h">{{item.name}}</span>
            <p class="app-cell_remark text--small text--ccc">{{item.desc}}</p>
            <!--<a class="btn rgo"><span class="btn_icon">→</span>立刻前往</a>-->
          </div>
        </li>

        <!--<li class="col&#45;&#45;4 app-cell">-->
          <!--<div class="app-cell_con flex  flex&#45;&#45;center flex&#45;&#45;column">-->
            <!--<div class="tipo">-->
              <!--<div class="tipdueo">-->
                <!--<span class="due">即将到期的</span>-->
                <!--<span class="arrow-up"></span>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="app-cell_img">-->
              <!--<i class="icon hx hx-hx__p_haocaijiesuan text&#45;&#45;blue fontsst"></i>-->
            <!--</div>-->
            <!--<h2>机构管理中心</h2>-->
            <!--<p class="app-cell_remark text&#45;&#45;small text&#45;&#45;ccc">药品基本资料及资质的申报、变-->
              <!--更、查询、编码及对照等</p>-->
            <!--<a class="btn rgo" @click='gotopage()' ><span class="btn_icon">→</span>立刻前往</a>-->
          <!--</div>-->
        <!--</li>-->

        <!-- cell  end-->
      </ul>
      <div class="kto" v-if="apps!=1 && apps.notOpenApps.length!=0">
        <span class="circle"></span>
        <span>未开通</span>
      </div>

      <ul class="flex list--unstyled app-list flex--wrap " v-if="apps!=1 && apps.notOpenApps.length">
        <!-- cell  -->
        <!--<li class="col&#45;&#45;4 app-cell" v-for="val of app.appData" :key="val.index">-->
        <!--<div class="app-cell_con flex  flex&#45;&#45;center flex&#45;&#45;column">-->
        <!--<div class="app-cell_img" v-if="val.logoFile">-->
        <!--<img :src="val.logoFile.url">-->
        <!--</div>-->
        <!--<h2>{{ val.name }}</h2>-->
        <!--<p class="app-cell_remark text&#45;&#45;small text&#45;&#45;ccc">{{ val.remark }}</p>-->
        <!--<a class="btn" @click='gotopage(val.url)' ><span class="btn_icon">→</span>立刻前往</a>-->
        <!--</div>-->
        <!--</li>-->

        <li class="col--4 app-cell" v-if="apps!=1" v-for="item in apps.notOpenApps">
          <div class="app-cell_con flex  flex--center flex--column" v-if="item.audit_status=='待审核'">
            <div class="tipo">
              <div class="tipaudit">
                <span class="due">待审核</span>
                <span class="arrow-up"></span>
              </div>
            </div>
            <div class="app-cell_img">
              <i class="icon hx   text--grayt fontsst" :class="item.icon"></i>
            </div>
            <h2 class="h2h">{{item.name}}</h2>
            <p class="app-cell_remark text--small text--ccc">{{item.desc}}</p>
            <a class="btn auditbc" @click='gotopage(item.url)' ><span class="btn_icon">→</span>查看开通状态</a>
          </div>

          <div class="app-cell_con flex  flex--center flex--column" v-else-if="item.audit_status=='审核不通过'">
            <div class="tipo">
              <div class="tipunpass">
                <span class="due">审核不通过</span>
                <span class="arrow-up"></span>
              </div>
            </div>
            <div class="app-cell_img">
              <i class="icon hx  text--red fontsst" :class="item.icon"></i>
            </div>
            <h2 class="h2h">{{item.name}}</h2>
            <p class="app-cell_remark text--small text--ccc">{{item.desc}}</p>
            <a class="btn uppassbc" @click='gotopage(item.url)' ><span class="btn_icon">→</span>查看开通状态</a>
          </div>

          <div class="app-cell_con flex  flex--center flex--column" v-else>
            <div class="tipo">
              <div class="tipunopen">
                <span class="due">未开通</span>
                <span class="arrow-up"></span>
              </div>
            </div>
            <div class="app-cell_img">
              <i class="icon hx   text--gray fontsst" :class="item.icon"></i>
            </div>
            <h2 class="h2h">{{item.name}}</h2>
            <p class="app-cell_remark text--small text--ccc">{{item.desc}}</p>
            <a class="btn unopenbc" @click='gotopage(item.url)' ><span class="btn_icon">→</span>马上开通</a>
          </div>

        </li>

      </ul>

      <!-- app list end-->
      <!-- side -->
      <!--<main-side />-->
      <!-- side end-->
      </div>
    <!-- content end-->

    <Modal v-model="modal2" width="600" :closable="false" :mask-closable="false">
      <p>
      <p slot="header" style="color:#1c2438;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div slot="footer" id="subuppwd" class="talignc">
        <!--<Button style="display: none" type="primary" size="large" class="butWid mcenter"></Button>-->
      </div>
      </p>
      <div id="uppwdnext"  class="dispnone">
        <div  class="setsuctitle">
          <span v-if="status=='-1'">注册成功！去完善资料</span>
          <span v-if="status=='1'">处于待审核，请完善资料</span>
          <span v-if="status=='2'">审核不通过，请从新提交</span>
          <span v-if="status=='3'">未提交资料，请提交资料</span>
        </div>
        <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动跳转到完善资料页，您可以选择<span class="relot" @click='relogin'> 重新登录</span></div>
      </div>
    </Modal>

  </div>


</template>
<script>
import callApi from '../../utils/callApi'
import MainSide from '../../components/MainSide'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      status: -1,
      modal2: false,
      fsecond: 5,
      ftimer: null,
      yse: 'hse',
      apps: 1,
      fsd: true,
      showSis: false,
      screenHeight: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
      containerH: 1
    }
  },
  computed: {
    ...mapState(['app'])
  },
  created() {
    this.getPotalInfo()
    this.goBack()
    //this.timeD()
  },
  methods: {
    ...mapActions(['setAppToken', 'getFrameData', 'gtPortalInfo','loginOut']),
    //重新登陆
    relogin: function(){
      this.loginOut()
      this.modal2 = false
      this.$router.push('/login')
    },
    timeD: function(){
      let stat = this.$route.query.status
      if(stat == '1'){
        this.modal2 = true
        this.fiveCountd()
        this.status = 1
      }else if(stat == '2'){
        this.modal2 = true
        this.fiveCountd()
        this.status = 2
      }else if(stat == '3'){
        this.modal2 = true
        this.fiveCountd()
        this.status = 3
      }
    },
    //倒计时
    fiveCountd: function(to){
      this.fsecond = 5
      clearInterval(this.ftimer)
      this.ftimer = null
      if(this.fsd){
        this.ftimer = setInterval(function(){
          this.fsecond--
          if(this.fsecond==0){
            clearInterval(this.ftimer);
            this.modal2 = false;
            window.location.href = '/dws/ocs/main/menu'
          }
        }.bind(this),1000)
      }
    },
    moveIn() {
      this.showSis = true
      this.yse = 'blues'
    },
    moveOut() {
      this.showSis = false
      this.yse = 'hse'
    },
    // 获取权限
    gotopage(url) {
      window.location.href = url
      // this.setAppToken().then(res => {
      //     window.location.href = url
      // })
    },
    goBack() {
      let uid = sessionStorage.getItem('uuid')
      if(uid!=null){
        this.$store.state.org_status = this.$store.state.app
      }
    },
    // 获取potal信息
    getPotalInfo(url) {
      this.gtPortalInfo().then(res => {
        this.apps = res
      })
    },
    contHeight() {
      //this.$refs.portal.offsetHeight

      //var heightCss = this.$refs.portal.offsetHeight
      //alert(heightCss)
    },
    init () {
      setTimeout(() => {
         this.containerH = this.$refs.container.offsetHeight
        let portalH = this.$refs.portal.offsetHeight
        console.log("containerHss is: "+this.containerH)
        console.log("portalH is: "+portalH)
        if(portalH > this.containerH){
          this.containerH = portalH
        }
        document.getElementById("container").style.height = this.containerH + "px"
        let seeh = document.getElementById("app").offsetHeight
        let headh = document.getElementById("header").offsetHeight
        let footh = document.getElementById("footer").offsetHeight
        let minh = seeh -headh- footh-30
        document.getElementById("container").style.minHeight = minh+ "px"
      }, 200)
    },
  },
  components: {
    MainSide
  },
  mounted() {
    let self = this
    this.init ()
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        self.screenHeight = window.screenHeight
      })()
    }
  },
  watch: {
    screenHeight (val) {
      this.init()
    }
  }
}
</script>
<!--<style  src="../../styles.css" ></style>-->
<style lang="scss" src="@/assets/iconfont/iconfont.css" ></style>
<style lang="scss" src="./app.scss" ></style>
