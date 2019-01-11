<template>
  <div class="wrap">
    <div class="container">
      <MainTitle mainTitle="选择应用" />
      <div class="content">
        <router-link v-for="(item, index) in appListCollection" :to="{path: `${item.link}`}" :key="index">
          <SelectionServicesBox :services="item"
          />
        </router-link>
      <!--<router-link to="/productDeclare">-->
        <!--<SelectionServicesBox :services="{-->
        <!--label:'product',-->
        <!--status:3,   //状态01（已开通）02（未开通）-->
        <!--summary:'耗材产品申报服务',-->
        <!--hot:'内容'}"-->
        <!--/>-->
      <!--</router-link>-->
      </div>
    </div>
  </div>
</template>

<script>
import SelectionServicesBox from '../../components/SelectionServicesBox'
import MainTitle from '../../components/MaintItle'
import {
  mapActions,
  mapState
} from 'vuex'
export default {
  name: 'SelectionServices',
  mounted () {
    this.getOrgStatus()
    this.getAppList()
      .then(res => {
      })
  },
  updated () {
  },
  components: {
    SelectionServicesBox,
    MainTitle
  },
  data () {
    return {
      appItems: []
    }
  },
  computed: {
    ...mapState([
      'appList'
    ]),
    appListCollection () {
      return this.appList.map(item => {
        if (item.appName === '耗材产品申报') {
          item.link = '/productDeclare/' + item.id
          item.hot = '境内医用耗材生产企业或境外医用耗材总代理企业申报耗材产品，并上传提交产品资质。'
          this.saveAppId(item.id)
        } else {
          item.link = ''
        }
        return item
      })
    }
  },
  methods: {
    ...mapActions([
      'getOrgStatus',
      'getAppList',
      'saveAppId'
    ]),
    addLink (appName) {
      switch (appName) {
        case '耗材产品申报':
          return '/productDeclare'
      }
    }
  }
}
</script>

<style src="./columns.scss" scoped lang="scss">

</style>
