<template>
    <!--<Modal v-model="modal3" width="600" class="modal3">-->
    <Modal v-model="modal3" width="600" class="modal3">
      <p slot="header" style="color:#1c2438;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>CA绑定</span>
      </p>

      <Form ref="formValidates" v-if="showForm" :model="formValidate" :rules="ruleValidate" :label-width="90" id="caBindf" :class='lookBindCa?"form---disabled":""'>
        <FormItem label="账号" prop="name">
          <Input v-model="formValidate.name" class="noEdit"></Input>
        </FormItem>
        <FormItem label="报名企业" prop="applyOrg">
          <Input v-model="formValidate.applyOrg" class="noEdit"></Input>
        </FormItem>
        <FormItem label="绑定企业" prop="bindingOrg">
          <Input v-model="formValidate.bindingOrg" class="noEdit" placeholder="请获取绑定企业"></Input>
        </FormItem>
        <FormItem label="证书序列号" prop="serialNum">
          <Input v-model="formValidate.serialNum" class="noEdit" placeholder="请获取正确序列号"></Input>
          <div class="xlh" @click="getSerial" v-if="showxlh">获取序列号</div>
        </FormItem>

        <FormItem label="通用名校验" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
            <Checkbox label="（校验企业/机构名称与绑定企业是否一致）"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="有效期" prop="express">
          <Input v-model="formValidate.express" class="noEdit" placeholder="请获取正确有效期"></Input>
        </FormItem>
        <FormItem style="text-align: center" v-if="showSave">
          <div><p class='errRemindBindCa'>{{cabind_error}}</p></div>
          <Button type="primary" @click="bindCas('formValidates')" style="width: 150px">保存</Button>
          <!--<Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
        </FormItem>
      </Form>

      <div slot="footer" id="calerrordiv" class="talignc" v-if="showTipMsg">
        <div>{{caL_errMsg}}</div>
        <!--<Button type="primary" size="large" class="butWid mcenter"  @click='updatePwd("formValidate")'>保存</Button>-->
      </div>

      <div id="caBindNext" v-if="showTD">
        <div  class="setsuctitle"><span>恭喜您！CA绑定成功，请继续完善资料！</span></div>
        <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动自动回关闭绑定页面</div>
      </div>

    </Modal>
</template>

<script>
/**
 * 显示用户名和设置的通用头部
 */
import { mapState, mapActions } from 'vuex'
import inputItem from '../components/complexInputItem'
import getcert from '../assets/js/getcert'
import validatejs from '../assets/js/validate'
export default {
  components: {
    inputItem
  },
  data() {
    return {
      showForm: true,
      showTipMsg: true,
      showTD: false,
      showT: true,
      lookBindCa: '',
      picCode: '请输入图文验证码',
      phoneVcode: '请输入短信验证码',
      ind: '1',
      disabledBtn: false,
      time: 120,
      timer: null,
      showxlh: true,
      showSave: true,
      caL_errMsg: '首次登录时，请下载并安装"CA证书客户端"，仅支持IE浏览器。',
      dsb : true,
      fruit:['（自动校验报名企业与绑定企业是否一致）'],
      entryt: 1,
      modal3: true,
      fsecond: 5,
      ftimer: null,
      fsd: true,
      errMsg: '',
      cabind_error: '',
      baseMaterError: '',
      reBindPerrMsg: '',
      bindCaUpdata: '',
      // 表单
      formValidate: {
        userOldPassword: '',
        userNewPassword: '',
        confirmPwd: '',
        name: '',
        applyOrg: '',
        bindingOrg: '',
        serialNum: '',
        express: '',
        interest: ['（校验企业/机构名称与绑定企业是否一致）'],
        account: '',
        realname: '',
        mobile: '',
        personid: '',
        remark: '',
        phone: '',
        phoneCode: '',
        NewPhone: '',
        vcode: '',
        nPhoneCode: ''
      },
      ruleValidate: {}
    }
  },
  computed: {
    ...mapState(['app','entry','org_status']),
    path() {
      return this.$route.fullPath
    }
  },
  created() {
    this.rules()
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['loginOut','getSerials','getRandom','bindCa','validBindCa']),
    getUserInfo: function() {
      this.cabind_error = ''
      //this.$refs['formValidates'].resetFields()
      this.formValidate.name = this.$store.state.org_status.account
      this.formValidate.applyOrg = this.$store.state.org_status.org_name
      this.showForm = true
      this.showTipMsg = true
      this.showTD = false
      // document.getElementById("caBindNext").setAttribute("class","dispnone");
      // document.getElementById("caBindf").style.display = "block"
      // document.getElementById("calerrordiv").style.display = "block"
    },
    //重新登陆
    relogin: function(){
      this.loginOut()
      this.$router.push('/login')
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
            window.location.href = '/dws/ocs/main/menu'
            this.modal3 = false
          }
        }.bind(this),1000)
      }

    },
    insCustom() {
      var objks = document.getElementById("obj");
      if (objks == null || objks.object == null){
        this.cabind_error = "您尚未安装证书客户端，请通过登录页面底部的链接下载最新版本证书客户端并安装。";
        //this.cabind_error = "您未使用新版证书或未正确安装证书驱动";
        return false;
      } else {
        this.cabind_error = "";
      }
    },
    repSerial(updata) {
      console.log("1"+JSON.stringify(updata))
      if(updata){
        this.getSerials(updata).then(/*获取序列号*/
          res => {
            if (res.success) {
              console.log("2"+JSON.stringify(res.content))
              let retRes = res.content
              this.formValidate.bindingOrg = retRes.generalName
              this.formValidate.serialNum = retRes.serialNum
              this.formValidate.express = retRes.express
              updata.applyOrg = this.formValidate.applyOrg
              updata.bindingOrg = this.formValidate.bindingOrg
              updata.serialNum = this.formValidate.serialNum
              updata.express = this.formValidate.express
              updata.username = this.formValidate.name

              this.bindCaUpdata = updata
            }
          }
        )

      }
    },
    getSerial() {
      var browVs = sessionStorage.getItem("browV")
      /*IE浏览器*/
      if(browVs != 'edge' && browVs != -1 ){
        this.insCustom()
      }
      this.getRandom().then(res => {/*获取随机数*/
        console.log(res)
        this.serRandom = res.content
        let updata = 0, serR = res.content, me = this, restatus = 0;

        /*非IE浏览器*/
        if(browVs == 'edge' || browVs == -1 ){
          //updata = getcert.getCertBsfNoIE(this.serRandom)
          // 执行接收消息事件
          let socket = getcert.getCertBsfNoIE(this.serRandom)
          socket.onmessage = function (msg)
          {
            if (typeof msg.data == "string")
            {
              updata =  getcert.dealWithResponseMessage(msg.data, serR)/*获取证书，签串*/
              if(updata == 1){
                me.cabind_error = "未检测到UKey或Ukey未登陆"
                return
              }
              me.repSerial(updata)
            }
          }
          socket.onclose = function (msg)
          {
            console.log("socket closed!")
            if (restatus != 1){
              restatus = 2
              me.cabind_error = "请重新连接";
            }
          };
          socket.onerror  = function (msg)
          {
            console.log("socket error!")
            restatus = 1
            me.cabind_error = "您未使用新版证书或未正确安装证书驱动";
          }
        }else{/*IE浏览器*/
          updata = getcert.getCertBsf(this.serRandom) /*获取证书，签串*/
          if(updata == 1){
            this.cabind_error = "未检测到UKey或Ukey未登陆"
            return
          }
          this.repSerial(updata)

        }

      })
    },
    bindCas(){
      this.$refs['formValidates'].validate(valid => {
        // 判断是否通过本地验证
        if (!valid) return
        if(this.formValidate.interest.length>0){
          this.bindCaUpdata.check = 1
        }else{
          this.bindCaUpdata.check = 2
        }
        //alert(JSON.stringify(this.bindCaUpdata))
        this.bindCaUpdata.type =  'portal'
        this.bindCa(this.bindCaUpdata).then(
          res => {
            //console.log("res is: "+JSON.stringify(res))
            if(res.success){
              this.showForm = false
              this.showTipMsg = false
              this.showTD = true
              // document.getElementById("caBindNext").removeAttribute("class","dispnone");
              // document.getElementById("caBindf").style.display = "none"
              // document.getElementById("calerrordiv").style.display = "none"
              this.fiveCountd(1)
            }
          },
          res => {
            //console.log("res2 is: "+JSON.stringify(res))
            this.cabind_error = res.errmsg
          }
        )
      })
    },

    /*初始化规则*/
    rules() {
      this.ruleValidate = {
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        applyOrg: [
          { required: true, message: '报名企业不能为空', trigger: 'blur' }
        ],
        bindingOrg: [
          { required: true, message: '绑定企业不能为空', trigger: 'blur' }
        ],
        serialNum: [
          { required: true, message: '证书序列号不能为空', trigger: 'blur' }
        ],
        express: [
          { required: true, message: '有效期不能为空', trigger: 'blur' }
        ]
      }
    }

  }
}
</script>
<!--<style lang="scss" src="../views/Register/Register.scss" type="text/css"></style>-->

// 用户导航
<style lang="scss" scoped>
.header {
  background: #fff;
  position: relative;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  height: 70px;
  .container {
    padding-bottom: 15px;
    padding-top: 15px;
    height: 70px;
  }
  .logo {
    height: 100%;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
    img {
      height: 100%;
    }
  }
  .title {
    font-size: 20px;
    color: #333;
    line-height: 1.2;
  }
  .title::before {
    content: '|';
    margin-left: 15px;
    margin-right: 15px;
    color: #ccc;
  }
  .nav a,.orgname {
    &::after {
      content: '|';
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  .iphone {
    font-size: 24px;
    color: #1686ea;
    background-image: url(../assets/images/iphone.png);
    background-position: left center;
    background-repeat: no-repeat;
    padding-left: 30px;
  }
  .orgname{font-size: 16px;color:#606266}
  .headpic{
    background-image: url(../assets/images/headpic.png);
    width: 30px;
    height:30px;
    margin-right: 15px;
    margin-top: -3px;
  }
  .fleft{float: left}
  .uname{font-size: 16px;margin-right: 15px;}
  .martop10{margin-top: 10px}
  .setting {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-top: -3px;
  }
  .list {
    li {
      color: #606266;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
    }
  }
}
.publicInput /deep/ .ivu-form-item-error-tip {
  left: 112px;
}
.modal5 .publicInput /deep/ .ivu-form-item-error-tip {
  left: 116px;
}
.publicInput /deep/ .ivu-input-wrapper {
  //width: 448px;
}
.dispnone{display: none}
.butWid{width: 250px}
.setsuctitle{margin: 0 auto;text-align: center;font-size: 24px}
.setsuctip{margin: 0 auto;text-align: center;font-size: 14px}
.mcenter{margin: 0 auto}
.talignc{text-align: center}
.textred{color: red;margin: 0 10px}
.relot{
  color: #2d8cf0;
  cursor: pointer;
}
.errRemind{
  text-align: center;
  margin-bottom: 10px;
  font-size: 16px;
  color: red;
}
.errRemindBindCa{
  text-align: left;
  margin-bottom: 10px;
  font-size: 16px;
  color: red;
  width: 340px;
}
.xlh{
  width: 150px;background-color: #2d8cf0;color: #fff;text-align: center;position: relative;margin: -35px 0 0 300px;border-radius: 3px;cursor: pointer
}
.getcode{
  position: relative;left: 300px;top: -40px;
  width: 153px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  background: #1686EA;
  border: none;
  border-radius: 6px;
  box-shadow: none;
}
.gtcods{left:410px}
.noEdit{
  pointer-events: none;
}
</style>
