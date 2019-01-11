<template>
    <Modal v-model="modalcaa" width="600" class="modalcaa" :closable="closeStatu" :mask-closable="closeShade">
      <p slot="header" style="color:#1c2438;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>CA激活</span>
      </p>
      <Form style="margin-right: 50px;" ref="formValidates" v-if="showForm" :model="formValidate" :rules="ruleValidate" :label-width="170" id="caBindf" :class='lookBindCa?"form---disabled":""'>
        <!--<FormItem label="企业类型" class="comptype ivu-form-item-required" prop="type">-->
          <!--<Select v-model="formValidate.type">-->
            <!--<Option value="1">医疗器械（医用耗材）生产企业</Option>-->
            <!--<Option value="2">医疗器械（医用耗材）代理企业</Option>-->
            <!--<Option value="3">医疗器械（医用耗材）配送企业</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->

        <FormItem label="企业类型" class="comptype ivu-form-item-required" prop="comptype">
          <RadioGroup v-model="formValidate.comptype">
            <Radio label="1" >医疗器械（医用耗材）生产企业</Radio>

            <Radio label="2" >医疗器械（医用耗材）代理企业</Radio>

            <Radio label="3" >医疗器械（医用耗材）配送企业</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="机构名称（组织名）" prop="infoname">
          <Input v-model="formValidate.infoname" class="noEdit"></Input>
        </FormItem>
        <FormItem label="通用名" prop="generalName">
          <Input v-model="formValidate.generalName" class="noEdit"></Input>
        </FormItem>
        <FormItem label="证书序列号" prop="serialNum">
          <Input v-model="formValidate.serialNum" class="noEdit" placeholder="请获取正确序列号"></Input>
        </FormItem>
        <FormItem label="有效期截至" prop="express">
          <Input v-model="formValidate.express" class="noEdit" placeholder="请获取正确有效期"></Input>
        </FormItem>
        <FormItem style="text-align: center" v-if="showSave">
          <div><p class='errRemindBindCa'>{{cabind_error}}</p></div>
          <Button type="primary" @click="activeCas('formValidates')" style="width: 150px;margin-left: -110px;">激活</Button>
        </FormItem>
      </Form>

      <div slot="footer" id="calerrordiv" class="talignc" v-if="showTipMsg">
        <div>{{caL_errMsg}}</div>
      </div>

      <div  v-if="showTD">
        <div  class="setsuctitle" style="line-height: 45px"><i style="float:left;font-size: 30px;color:#1ABC9C" class="icon hx hx-hx_zhengquexuanzhong"></i><span>您已成功激活CA证书，账号生成中，请耐心等待！</span></div>
        <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动返回登录页面</div>
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
  props: {
    bdInfo: {
      type: Object
    }
  },
  components: {
    inputItem
  },
  data() {
    return {
      closeStatu: true,
      closeShade: true,
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
      caL_errMsg: '首次登录时，请下载并安装"CA证书客户端"',
      dsb : true,
      fruit:['（自动校验报名企业与绑定企业是否一致）'],
      entryt: 1,
      modalcaa: true,
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
        infoname: '',
        generalName: '',
        strCertInfo: '',
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
        nPhoneCode: '',
        type: ''
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
    //this.getUserInfo()
    this.initBdInfo()
  },
  methods: {
    ...mapActions(['loginOut','getSerials','getRandom','activeCa','validBindCa']),
    initBdInfo: function() {
      this.closeStatu = true
      this.closeShade = true
      this.formValidate.infoname = this.bdInfo.infoname
      this.formValidate.generalName = this.bdInfo.generalName
      this.formValidate.strCertInfo = this.bdInfo.strCertInfo
      this.formValidate.express = this.bdInfo.express
      this.formValidate.serialNum = this.bdInfo.serialNum
    },
    //重新登陆
    relogin: function(){
      this.loginOut()
      this.$router.push('/login')
      this.modalcaa = false
    },
    //倒计时
    fiveCountd: function(to){
      this.fsecond = 10
      clearInterval(this.ftimer)
      this.ftimer = null
      if(this.fsd){
        this.ftimer = setInterval(function(){
          this.fsecond--
          if(this.fsecond==0){
            clearInterval(this.ftimer);
            this.loginOut()
            this.modalcaa = false
          }
        }.bind(this),1000)
      }

    },
    activeCas(){
      this.$refs['formValidates'].validate(valid => {
        // 判断是否通过本地验证
        if (!valid) return
        if(!this.formValidate.comptype){
          this.cabind_error = "企业类型不能为空"
          return
        }else {
          this.cabind_error = ""
        }
        this.bindCaUpdata = {}
        this.bindCaUpdata.infoname = this.formValidate.infoname
        this.bindCaUpdata.generalName = this.formValidate.generalName
        this.bindCaUpdata.strCertInfo = this.formValidate.strCertInfo
        this.bindCaUpdata.express = this.formValidate.express
        this.bindCaUpdata.serialNum = this.formValidate.serialNum
        this.bindCaUpdata.type = this.formValidate.comptype
        this.activeCa(this.bindCaUpdata).then(
          res => {
            if(res.success){
              // this.showForm = false
              // this.showTipMsg = false
              // this.showTD = true
              // this.fiveCountd(1)
              this.showForm = false
              this.showTipMsg = true
              this.caL_errMsg = ""
              this.showTD = true
              this.closeStatu = false
              this.closeShade = false
              this.fiveCountd(1)
            }
          },
          res => {
            this.cabind_error = res.errmsg
          }
        )
      })
    },

    /*初始化规则*/
    rules() {
      this.ruleValidate = {
        infoname: [
          { required: true, message: '机构名称不能为空', trigger: 'blur' }
        ],
        comptype1: [
          { required: true, message: '企业类型不能为空', trigger: 'blur' }
        ],
        generalName: [
          { required: true, message: '通用名不能为空', trigger: 'blur' }
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
.comptype .ivu-select{width: 280px;}

</style>
<style lang="scss" src="@/assets/iconfont/iconfont.css" ></style>
