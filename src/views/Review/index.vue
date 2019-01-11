<style lang="scss" scoped>
.container {
  padding-top: 80px;
  height: 457px;
  background: #fff;
}
p {
  margin-top: 13px;
}
.failed-text-note {
  font-size: 14px;
  color: #909399;
}

// icon
.iconC {
  display: inline-block;
  width: 112px;
  height: 112px;
  border-radius: 50%;
  font-size: 112px;
}
// 审核不通过
.color--red .iconC {
  color: #f56c6c;
}
// 审核中
.color--orange .iconC {
  background: #ffba53;
  color: #fff;
}
.color--ccc .iconC {
  background: #e4e7ed;
  color: #fff;
}
.success-line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #e4e7ed;
  margin-top: 20px;
  margin-bottom: 20px;
}
.btnM-bt.ivu-btn {
  text-align: center;
  // color: #1686EA;
  // border: 2px solid #1686EA;
  margin: 0 15px;
  font-size: 16px;
  font-weight: bold;
  // background: #ffffff;
}
.btnM-bt {
  min-width: 205px;
  height: 60px;
  color: #1686ea;
  border: 1px solid #1686ea;
  background: none;
}
</style>
<template>
<div class="container--fluid flex align-items--center">
  <!--<span>{{org_status}}</span>-->
  <div class="container"  v-if="data!=null">
    <!-- 审核内容 -->
    <p class="text--center" :class="data.color" >
      <Icon :type="data.icon" class="iconC"></Icon>
    </p>
    <p class="text--center text--h1 text--b"> {{data.title}}</p>
    <p class="text--center failed-text-note">{{data.content}}</p>
    <!-- 审核内容 end-->
    <div>
     <div class="success-line"></div>
     <div class="flex justify-content--center">
     <Button  v-if='this.org_status.flag == "1"' class="btnM-bt" type="primary" @click="cancelOrg" >撤回</Button>
     <!--1待审核和2审核中end-->
     <Button v-if='this.org_status.flag == "1" ||this.org_status.flag == "2"'  class="btnM-bt" type="primary" @click="register(1)" >查看我提交的资料</Button>

     <!--4审核不通过end-->
     <Button v-if='this.org_status.flag == "4"'  class="btnM-bt" type="primary" @click="register" >去修改</Button>
     </div>

    </div>
  </div>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Review',
  data() {
    return {
      orgstatus:'1',
      reviewData: {
        '01': {
          title: '未提交',
          icon: 'ios-more',
          color: 'color--ccc',
          content: '您还未提交资料，无法审核。'
        },
        '1': {
          title: '待审核',
          icon: 'ios-more',
          color: 'color--ccc',
          content: '等待审核，请耐心等待！'
        },
        '2': {
          title: '审核中',
          icon: 'ios-more',
          color: 'color--orange',
          content: '信息正在进行审核，请耐心等待。'
        },
        '4': {
          title: '审核不通过',
          icon: 'close-circled',
          color: 'color--red',
          content: '用户机构授权信息审核不通过，请修改资料后重新提交。'
        }
      }
    }
  },
  computed: {
    ...mapState(['app','org_status']),
    data() {
      if(this.org_status.flag!=null){
        let state = this.reviewData[this.org_status.flag]
        //let msg = this.app.cause
        let info = JSON.parse(JSON.stringify(state))
        // 审核不通过提示
        //if (msg) info.content = msg
        return info

      }
    }
  },
  created() {
    this.gtOrgStatus()
    this.goBack()
  },
  watch: {
    orgstatus: function(curVal,oldVal){
      console.log("orgstatus cur val:"+curVal+" old val:"+ oldVal);
    }
  },
  methods: {
    // ...mapActions(['withdraw']),
    ...mapActions(['getOrgStatus','revoke']),
    goBack() {
      let uid = sessionStorage.getItem('uuid')
      if(uid!=null){
        this.$store.state.org_status = this.$store.state.app
      }
    },
    gtOrgStatus() {
       this.getOrgStatus().then(res => {
        //console.log("hhhhhhhhh"+JSON.stringify(res))
        this.orgstatus = JSON.stringify(res)
      })
    },
    /**
     * 撤回
     */
    cancelOrg() {
      this.$Modal.confirm({
        title: '操作确认',
        content: '确认撤回当前待审核信息，重新提交？',
        onOk: () => {
          // 撤回注册
          let uname = document.getElementById("username").innerText
          let mode = this.$route.query.mode
          this.revoke({username: uname}).then(res => {
            if (res.success) {
              this.gtOrgStatus()
              //this.withdrawState = true
            }
          })
          if(mode==1){// 编辑医疗机构注册页面
            this.$router.push('/register1?reset=1&flag=0')
          }else{// 编辑企业注册页面
            this.$router.push('/register?reset=1&flag=0')
          }
        }
      })
    },
    /**
     * 前往注册
     */
    register(l = '') {
      let mode = this.$route.query.mode, path=''
      // 1医疗  2企业
      // if(this.org_status.org_type!=null){
      //   if (this.org_status.org_type === 'DIS') {/*生产企业*/
      //     mode = 2
      //   }else if(this.org_status.org_type === 'HOS'){/*医疗机构*/
      //     mode = 1
      //   }
      // }

      if (l == 1) {//查看
        if(mode==1){//医疗机构
          path = '/register1'
        }else{//企业
          path = '/register'
        }
        path += '?look=1'
      }else {//编辑
        if(mode==1){//医疗机构
          path = '/register1'
        }else{//企业
          path = '/register'
        }
        path += '?reset=1'
      }
      this.$router.push(path)
    }
  }
}
</script>
