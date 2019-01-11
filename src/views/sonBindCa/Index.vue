<template>
<div class="main--fluid centers">

    <div class="main" id="fpw" :style="'height:'+ clientHeight ">
      <!-- 表单 -->
       <Form ref='formValidate' :model='formValidate' :rules='ruleValidate' :label-width='245'>
         <table class="ititle">
           <thead>
             <th  class="nowC comC" :class="classNow" v-if="ind==1? classNow='nowC': classNow='passC'"><div>1</div><span>手机验证</span></th>
             <th  class="defaultC comC"  v-if="ind==2? classNow='nowC': classNow='passC'" id="twoth"><div>2</div><span>CA绑定</span></th>
             <th  class="defaultC comC"  v-if="ind==3? classNow='nowC': classNow='passC'" id="threeth"><div>3</div><span>完成</span></th>
           </thead>
         </table>
       <div style="margin-top:30px;" >
         <div v-if="ind==1">
          <inputItem
            :labelVal='{label:"手机号"}'
            :model='formValidate'
            prop='phone'
            ref='phone'
            plh = '请输入您的手机号'
          />
           <!--<inputItem-->
            <!--:labelVal='{label:"身份证号",tip:"请输入绑定的身份证号码"}'-->
            <!--:model='formValidate'-->
            <!--prop='cardNo'-->
          <!--/>-->

         <!-- 图片验证码 -->
         <div class='verificationCode publicInput'>
           <FormItem label='验证码：' prop='vcode' class='formItem'>
             <div class='NumCode inputvcode'>
               <Input class="fleft" type='text' v-model='formValidate.vcode' :placeholder="picCode"/>
               <img @click="handleRefreshCode" width="80" height="30" :src="'/dws/pub/vcode/img'" class="from_codes" id="verify"/>
             </div>
           </FormItem>
         </div>
         <!-- 图片验证码 end-->

          <!-- 手机验证码 -->
          <div class='verificationCode publicInput'>
            <FormItem label='短信验证码：' prop='phoneCode' class='formItem'>
              <div class='NumCode'>
                <Input type='text' v-model='formValidate.phoneCode' :placeholder="phoneVcode"/>
                <Button disabled v-show='disabledBtn'>{{time}}s后可重新获取</Button>
                <Button @click='getNumCode' v-show='!disabledBtn'>获取验证码</Button>
              </div>
              <label class='rightTip text-center'>请于2分钟内查收手机短信，并填写短信中的验证码</label>
            </FormItem>
          </div>
          <!-- 手机验证码 end-->
         </div>
          <!-- passwork -->
         <div v-if="ind==2" class="modal3">

           <Form ref="formValidates" :model="formValidate" :rules="ruleValidate" :label-width="90" id="caBindf" class="hmid cont">
             <FormItem label="账号" prop="name">
               <Input v-model="formValidate.name"></Input>
             </FormItem>
             <FormItem label="报名企业" prop="applyOrg">
               <Input v-model="formValidate.applyOrg"></Input>
             </FormItem>
             <FormItem label="绑定企业" prop="bindingOrg">
               <Input v-model="formValidate.bindingOrg"></Input>
             </FormItem>
             <FormItem label="证书序列号" prop="serialNum">
               <Input v-model="formValidate.serialNum"></Input>
               <div class="xlh" @click="getSerial">获取序列号</div>
             </FormItem>

             <FormItem label="通用名校验" prop="interest">
               <CheckboxGroup v-model="formValidate.interest" >
                 <Checkbox label="（校验企业/机构名称与绑定企业是否一致）"></Checkbox>
               </CheckboxGroup>
             </FormItem>
             <FormItem label="有效期" prop="express">
               <Input v-model="formValidate.express"></Input>
             </FormItem>
             <FormItem>
               <div style="visibility: visible"><p class='errRemind'>{{cabind_error}}</p></div>
               <Button type="primary" @click="bindCas('formValidates')" style="width: 150px;margin-left: 60px">保存</Button>
             </FormItem>
             <div style="border-top: 1px solid #e9eaec;" >
               <div style="padding: 12px 18px 12px 18px;">{{caL_errMsg}}</div>
             </div>

           </Form>

         </div>
          <!-- passwork end-->
         <div v-if="ind==3">
           <div class="congr">恭喜您！密码设置成功，请重新登录！</div>
           <div class="relogin">系统将在<span class="textred">{{fsecond}}</span><span>秒后自动调整至登录页面，您可以选择直接登陆</span> <router-link class="pull-right relot" to="/login">返回登录</router-link></div>

         </div>
        </div>
      </Form>
      <!-- 表单 end-->
      <!-- sub -->
      <div class="registerWrap w1198">
      <!-- tip -->
      <p class='errRemind'>{{errMsg}}</p>
      <!-- tip end-->
       <Button v-if="ind==1 || ind==2" type='primary' class='registerBtn' @click='handleSubmit("formValidate")'>下一步</Button>
      </div>
      <!-- sub end-->
    </div>

</div>
</template>

<script>
// import Steps from "../../components/NewPasswordSteps";

import { mapActions, mapState } from 'vuex'
import inputItem from '../../components/complexInputItem'
import validatejs from '../../assets/js/validate'
import getcert from '../../assets/js/getcert'

export default {
  name: 'NewPassword',
  components: {
    inputItem
    // Steps
  },
  data: function() {
    return {
      cabind_error: '',
      caL_errMsg: '首次登录时，请下载并安装"CA证书客户端"，仅支持IE浏览器。',
      bindCaUpdata: '',
      picCode: '请输入图文验证码',
      phoneVcode: '请输入短信验证码',
      ind: 1,
      username: 0,
      fsecond: 5,
      ftimer: null,
      fsd: true,
      clientHeight: '500',
      src: '',
      disabledBtn: false,
      time: 180,
      timer: null,
      err: false,
      errMsg: '',
      reviewUrl: '', // 存放预览图片
      formValidate: {
        cardNo: '',
        vcode: '',
        phone: '',
        phoneCode: '',
        name: '',
        applyOrg: '',
        bindingOrg: '',
        serialNum: '',
        express: '',
        interest: ['（校验企业/机构名称与绑定企业是否一致）']
      },
      ruleValidate: {
        cardNo: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { validator: validatejs.validateIdCard, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: validatejs.validatePhone, trigger: 'blur' }
        ],
        vcode: [
          { required: true, message: '图片验证码不能为空', trigger: 'blur' }
        ],
        phoneCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapState(['app', 'qcode']),
  },

  methods: {
    ...mapActions(['getPCodeBindCa', 'getqcode', 'resetpwd', 'validatePhoneCa', 'verifPicCode']),
    mathRandow() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    },
    //图片验证码
    handleRefreshCode() {
      document.getElementById("verify").src = "/dws/pub/vcode/img?sessionKey ="+ this.mathRandow()
    },
    /*
    * 倒计时
    * */
    getNumCode: function() {
      let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (phoneReg.test(this.formValidate.phone)) {
        this.disabledBtn = !this.disabledBtn
        this.time = 120
        clearInterval(this.timer)
        this.timer = null
        if (this.disabledBtn) {
          this.timer = setInterval(
            function() {
              this.time--
              if (this.time === 0) {
                this.disabledBtn = !this.disabledBtn
                this.time = 120
                clearInterval(this.timer)
              }
            }.bind(this),
            1000
          )
        }
        // 获得验证码
        this.getPCodeBindCa({
          mobile: this.formValidate.phone
        }).then(res => {
          if (res.success) {
            // this.formValidate.uuid = res.content.uuid;
          }
        })
      } else {
        return false
      }
    },
    fiveCountd: function(){
      this.fsecond = 5
      clearInterval(this.ftimer)
      this.ftimer = null
      if(this.fsd){
        this.ftimer = setInterval(function(){
          this.fsecond--
          if(this.fsecond==0){
            clearInterval(this.ftimer);
            this.$router.push('/login')
          }
        }.bind(this),1000)
      }

    },
    /*检查是否安装客户端*/
    insCustom() {
      var objks = document.getElementById("obj");
      if (objks == null || objks.object == null){
        this.cabind_error = "您未使用新版证书或未正确安装证书驱动";
        return false;
      } else {
        this.cabind_error = "";
      }
    },
    /*获取序列号*/
    getSerial() {
      this.insCustom()
      this.getRandom().then(res => {/*获取随机数*/
        console.log(res)
        this.serRandom = res.content
        let updata = getcert.getCertBsf(this.serRandom)
        console.log("1"+JSON.stringify(updata))
        if(updata){
          this.getSerials(updata).then(/*获取序列号*/
            res => {
              if (res.success) {
                console.log("2"+JSON.stringify(res.content))
                let retRes = res.content
                this.formValidate.bindingOrg = retRes.generalName,
                this.formValidate.serialNum = retRes.serialNum,
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
      })
    },

    /*
    * 注册提交
    * */
    handleSubmit: function(name) {
      this.$refs[name].validate(valid => {
        // 判断是否通过本地验证
        if (!valid) return
        if(this.ind==1){/*第一步提交*/
          let param = {
            mobile: this.formValidate.phone,
            scode: this.formValidate.phoneCode // 请在之前调用发送短信验证码的接口向用户发送短信验证码,
          }
          this.ind=2

          this.verifPicCode({code:this.formValidate.vcode}).then(res => {
            if(res.success){

              this.validatePhoneCa(param).then(res => {
                if (res.success) {
                  // 成功提醒
                  this.ind=2
                  this.username = res.content;
                  document.getElementById("twoth").setAttribute("class","comC nowC");
                  this.errMsg = ''
                } else {
                  // 失败提醒
                  this.errMsg = res.errmsg
                  this.handleRefreshCode()
                }
              })

            }else {
              this.errMsg = res.errmsg
            }
          })

        }else if(this.ind==2){

          this.$refs['formValidates'].validate(valid => {
            // 判断是否通过本地验证
            if (!valid) return
            if(this.formValidate.interest.length>0){
              this.bindCaUpdata.check = 1
            }else{
              this.bindCaUpdata.check = 2
            }
            this.bindCaUpdata.type = 'login'
            //alert(JSON.stringify(this.bindCaUpdata))
            this.bindCa(this.bindCaUpdata).then(
              res => {
                console.log(JSON.stringify(res))
                if(res.success){
                  document.getElementById("caBindNext").removeAttribute("class","dispnone");
                  document.getElementById("caBindNext").setAttribute("class","hmid cont");
                  document.getElementById("caBindf").style.display = "none"
                  document.getElementById("calerrordiv").style.display = "none"
                  this.fiveCountd(1)
                }
              },
              res => {
                this.cabind_error = res.errmsg
              }
            )
          })

          // let param = {
          //   username: this.username,
          //   userpwd: this.formValidate.password,
          //   userpwd2: this.formValidate.confirmPwd // 请在之前调用发送短信验证码的接口向用户发送短信验证码,
          // }
          // this.resetpwd(param).then(res => {
          //   if (res.success) {
          //     this.ind=3
          //     this.fiveCountd()
          //     document.getElementById("twoth").setAttribute("class","comC passC");
          //     document.getElementById("threeth").setAttribute ("class","comC nowC");
          //     // 成功提醒
          //     this.errMsg = ''
          //   } else {
          //     // 失败提醒
          //     this.errMsg = res.errmsg
          //   }
          // })
        }
      })
    },
    /*
    * 高度设置
    * */
    setHeight: function () {
      let clih = document.documentElement.clientHeight;
      if(clih<=768){
        this.clientHeight = '498px'
      }else{
        let fheight = document.getElementsByTagName("footer")[0].clientHeight
        console.log("footer height is: "+fheight)
        this.clientHeight = `${document.documentElement.clientHeight-fheight-91-30}px`;
      }
    }
  },

  mounted() {
    this.handleRefreshCode()
    this.setHeight()
    const that = this
    window.onresize = function temp() {
      that.setHeight()
    }
  }
}
</script>
<style lang="scss" src="../NewPassword/NewPassword.scss" type="text/css"></style>
<style lang="scss" src="../Register/Register.scss" type="text/css"></style>
<style lang="scss" scoped>
  .xlh{
    width: 150px;background-color: #2d8cf0;color: #fff;text-align: center;position: relative;margin: -35px 0 0 300px;border-radius: 3px;cursor: pointer
  }
  .cont{width: 570px;margin: 0 auto}
</style>
