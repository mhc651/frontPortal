<style lang="scss" scoped>
  .publicInput /deep/ .ivu-form-item-error-tip {
    left: 112px;
  }
  .cont /deep/ .ivu-input-wrapper {
    width: 448px;
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
    text-align: left;
    margin-bottom: 10px;
    font-size: 16px;
    color: red;
  }
  .xlh{
    width: 150px;background-color: #2d8cf0;color: #fff;text-align: center;position: relative;margin: -35px 0 0 300px;border-radius: 3px;cursor: pointer
  }
.cont{width: 550px;margin: 0 auto}
.hmid{ position: absolute;top: 50%;left: 50%; transform: translateY(-50%) translateX(-50%);}
/*.hmid input{*/
    /*pointer-events: none;*/
  /*}*/
</style>

<template>
  <div class="container--fluid cbco">
    <Form ref="formValidates" :model="formValidate" :rules="ruleValidate" :label-width="90" id="caBindf" class="hmid cont">
      <FormItem label="账号" prop="name" class="unedit mb14">
        <Input v-model="formValidate.name"></Input>
      </FormItem>
      <FormItem label="报名企业" prop="applyOrg" class="unedit mb14">
        <Input v-model="formValidate.applyOrg"></Input>
      </FormItem>
      <FormItem label="绑定企业" prop="bindingOrg" class="unedit mb14">
        <Input v-model="formValidate.bindingOrg"></Input>
      </FormItem>
      <FormItem label="证书序列号" prop="serialNum" class="unedit mb14">
        <Input v-model="formValidate.serialNum"></Input>
        <div class="xlh" @click="getSerial">获取序列号</div>
      </FormItem>

      <FormItem label="通用名校验" prop="interest" class="mb14">
        <CheckboxGroup v-model="formValidate.interest" >
          <Checkbox label="（校验企业/机构名称与绑定企业是否一致）"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="有效期" prop="express" class="unedit mb14">
        <Input v-model="formValidate.express"></Input>
      </FormItem>
      <FormItem class="mb14">
        <div style="visibility: visible"><p class='errRemind'>{{cabind_error}}</p></div>
        <Button type="primary" @click="bindCas('formValidates')" style="width: 150px;margin-left: 60px">保存</Button>
      </FormItem>
      <div style="border-top: 1px solid #e9eaec;" >
        <div style="padding: 12px 18px 12px 18px;">{{caL_errMsg}}</div>
      </div>
    </Form>

    <div  id="caBindNext"  class="dispnone">
      <div  class="setsuctitle"><span>恭喜您！CA绑定成功，请重新登录！</span></div>
      <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动自动回到登录页面，您可以选择<span class="relot" @click='relogin'>重新登录</span></div>
    </div>

    <div id="caBindNexts" class="dispnone">
      <div  class="setsuctitle"><span>恭喜您！CA绑定成功，请继续完善资料！</span></div>
      <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动自动回关闭绑定页面</div>
    </div>

  </div>
</template>

<script>
/**
 * 显示用户名和设置的通用头部
 */
import { mapState, mapActions } from 'vuex'
import inputItem from '../../components/complexInputItem'
import getcert from '../../assets/js/getcert'
export default {
  components: {
    inputItem
  },
  data() {
    return {
      showTD: true,
      clientHeight: '500',
      caL_errMsg: '首次登录时，请下载并安装"CA证书客户端"，仅支持IE浏览器。',
      dsb : true,
      fruit:['（自动校验报名企业与绑定企业是否一致）'],
      entryt: 1,
      fsecond: 5,
      ftimer: null,
      fsd: true,
      errMsg: '',
      cabind_error: '',
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
        interest: ['（校验企业/机构名称与绑定企业是否一致）']

      },
      ruleValidate: {
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
  },
  computed: {
    ...mapState(['app','entry','org_status'])

  },
  mounted() {
    this.getOrgStatu()
  },
  created() {
    //this.getOrgStatu()
  },
  methods: {
    ...mapActions(['loginOut','getSerials','getRandom','bindCa','getOrgStatus']),
    getOrgStatu: function(){
      this.getOrgStatus().then(res => {
        this.formValidate.name = this.$store.state.org_status.account
        this.formValidate.applyOrg = this.$store.state.org_status.org_name
        //console.log("orgstatus: "+JSON.stringify(res))
      })
    },
    //重新登陆
    relogin: function(){
      clearInterval(this.ftimer)
      this.loginOut()
      this.$router.push('/login?tag=ca')
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
            if(to==2){
              this.loginOut()
              this.$router.push('/login?tag=ca')
            }else if (to==1){
              window.location.href = '/dws/ocs/main/menu'
            }
          }
        }.bind(this),1000)
      }

    },
    openBindCa() {
      this.cabind_error = ''
      this.modal3 = true
      this.$refs['formValidates'].resetFields()
      //alert(JSON.stringify(this.$store.state.org_status))
      this.formValidate.name = this.$store.state.org_status.account
      this.formValidate.applyOrg = this.$store.state.org_status.org_name
      document.getElementById("caBindNext").setAttribute("class","dispnone");
      document.getElementById("caBindf").style.display = "block"
      document.getElementById("calerrordiv").style.display = "block"
    },
    insCustom() {
      var objks = document.getElementById("obj");
      if (objks == null || objks.object == null){
        this.cabind_error = "您未使用新版证书或未正确安装证书驱动";
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
        this.bindCaUpdata.type = 'login'
        //alert(JSON.stringify(this.bindCaUpdata))
        this.bindCa(this.bindCaUpdata).then(
          res => {
            console.log("bind success: "+JSON.stringify(res))
            if(res.success){
              let nfMa = this.$route.query.noPerfM
              if(nfMa == '1'){/*未完善资料未绑定CA*/
                document.getElementById("caBindNexts").removeAttribute("class","dispnone");
                document.getElementById("caBindNexts").setAttribute("class","hmid cont");
                this.fiveCountd(1)
              }else{/*已完善资料未绑定CA*/
                document.getElementById("caBindNext").removeAttribute("class","dispnone");
                document.getElementById("caBindNext").setAttribute("class","hmid cont");
                this.fiveCountd(2)
              }
              document.getElementById("caBindf").style.display = "none"
              document.getElementById("calerrordiv").style.display = "none"
            }
          },
          res => {
            console.log("bind fail: "+JSON.stringify(res))
            this.cabind_error = res.errmsg
          }
        )
      })


    }
  }
}
</script>
<style src='./comBindCa.css' lang='scss'></style>

