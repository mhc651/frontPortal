

<template>
  <header class="header"  id="header">
      <div class="container">
        <!--<span>{{org_status}}</span>-->
        <!-- nav -->
        <div class="float--right flex align-items--center martop10" v-if="org_status.org_name">
          <nav class="nav">
            <span class="orgname fleft">{{org_status.org_name}}</span>
            <div class="headpic fleft"></div>
            <span class="uname fleft" id="username">{{org_status.account}}</span>

            <Poptip trigger="click" placement="bottom">
              <img src="../assets/images/setting.png" alt="" class="setting">
              <ul slot="content" class="list" @click="handleSetting($event)">
                <!-- <li>
                  修改密码
                </li> -->
                <li @click="getBaseM">
                  基本资料
                </li>
                <li @click='openRebindM("formValidate5")'>
                  手机号重绑
                </li>
                <li v-if="org_status.status=='ORG_AUDIT_PASS' || org_status.status=='审核通过'">
                  绑定CA
                </li>
                <li @click="openUpPwd">
                  修改密码
                </li>
                <li>
                  退出
                </li>
              </ul>
            </Poptip>

          </nav>
          <!--<span class="iphone text&#45;&#45;dinmed">{{entry.action[4].name}}</span>-->
        </div>

        <div class="float--right flex align-items--center" v-else>
          <nav class="nav">
            <!--<a href="/">平台首页</a>-->
            <!--<a href="http://dev1.hxmec.com/static/of/index.html">返回首页</a>-->
            <!--<span @click="openUpPwd">修改密码</span>-->
           <!--<router-link v-if="path !== '/register'"  to="/register">企业注册</router-link>-->
           <!--<router-link v-if="path !== '/register1'" to="/register1">医疗机构注册</router-link>-->
           <router-link to="/login" v-if="this.$route.path!='/login'">返回登录</router-link>
            <!--<span @click="bindCa">Ca绑定</span>-->
          </nav>
          <span class="iphone text--dinmed" v-if="entryt!=1">{{entryt.action[4].name}}</span>
          <span>{{entryt.length}}</span>
        </div>
        <!-- nav end-->

        <!-- logo -->
        <div class="logo">
            <img :src="logo" alt="" >
          <div v-if="showT"><span class="title"  v-if="entryt!=1">{{entryt.title_head}}</span></div>
        </div>
        <!-- logo end-->


      </div>

    <Modal v-model="modal2" width="600">
      <p>
        <p slot="header" style="color:#1c2438;text-align:left">
          <Icon type="ios-information-circle"></Icon>
          <span>提示</span>
        </p>
        <div  id="uppwd">
          <Form ref='formValidate' :model='formValidate' :rules='ruleValidate' :label-width='90'>
            <!-- 密码单元 -->
            <inputItem v-if="ruleValidate.userOldPassword"
                       :labelVal='{label:"旧密码"}'
                       :model='formValidate'
                       prop='userOldPassword'
                       inputType='password'
            />
            <inputItem v-if="ruleValidate.userNewPassword"
                       :labelVal='{label:"新密码"}'
                       :model='formValidate'
                       prop='userNewPassword'
                       inputType='password'
            />
            <inputItem  v-if="ruleValidate.confirmPwd"
                        :labelVal='{label:"确认密码"}'
                        :model='formValidate'
                        prop='confirmPwd'
                        inputType='password'
            />
            <!-- 密码单元 end-->
          <p style="text-align: center">密码为6-20位英文字母、数字的组合</p>
          </Form>
        </div>
        <div slot="footer" id="subuppwd" class="talignc">
          <p class='errRemind'>{{errMsg}}</p>
          <Button type="primary" size="large" class="butWid mcenter"  @click='updatePwd("formValidate")'>修改密码</Button>
        </div>
      </p>
      <div id="uppwdnext"  class="dispnone">
        <div  class="setsuctitle"><span>恭喜您！密码设置成功！</span></div>
        <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动关闭窗口，您可以选择<span class="relot" @click='relogin'>重新登录</span></div>
      </div>
    </Modal>

    <Modal v-model="modal3" width="600" class="modal3">
      <p slot="header" style="color:#1c2438;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>CA绑定</span>
      </p>

      <Form ref="formValidates" :model="formValidate" :rules="ruleValidate" :label-width="90" id="caBindf" :class='lookBindCa?"form---disabled":""'>
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

      <div slot="footer" id="calerrordiv" class="talignc">
        <div>{{caL_errMsg}}</div>
        <!--<Button type="primary" size="large" class="butWid mcenter"  @click='updatePwd("formValidate")'>保存</Button>-->
      </div>

      <div id="caBindNext"  class="dispnone">
        <div  class="setsuctitle"><span>恭喜您！CA绑定成功，请重新登录！</span></div>
        <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动自动回到登录页面，您可以选择<span class="relot" @click='relogin'>重新登录</span></div>
      </div>

    </Modal>
    <OBJECT id="obj" name="obj" classid="CLSID:093EA822-9C5D-4D46-883E-3421A93DCCF8" codebase="FJCAApi.ocx" style="LEFT: 0px; TOP: 0px" height="12" width="12"></OBJECT>

    <Modal v-model="modal4" width="600">
      <p>
      <p slot="header" style="color:#1c2438;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>基本资料查看</span>
      </p>
      <div>
        <Form ref='formValidate' :model='formValidate' :rules='ruleValidate' :label-width='90' class="basemat">
          <!-- 密码单元 -->
          <inputItem :labelVal='{label:"登录账号"}'
                     :model='formValidate'
                     prop='account'
                     inputType='text'
          />
          <inputItem :labelVal='{label:"用户姓名"}'
                     :model='formValidate'
                     prop='realname'
                     inputType='text'
          />
          <inputItem  :labelVal='{label:"手机号"}'
                      :model='formValidate'
                      prop='mobile'
                      inputType='text'
          />
          <inputItem   :labelVal='{label:"身份证号"}'
                      :model='formValidate'
                      prop='personid'
                      inputType='text'
          />
          <FormItem class="publicInput" label="备注：">
            <Input  style="width: 408px;height: 80px" type="textarea"  v-model="formValidate.remark"></Input>
          </FormItem>
          <!-- 密码单元 end-->
        </Form>
      </div>
      <div slot="footer"  class="talignc">
        <p class='errRemind'>{{baseMaterError}}</p>
        <Button type="primary" size="large" class="butWid mcenter"  @click='closeBaseM("formValidate")'>关闭</Button>
      </div>
      </p>
    </Modal>

    <Modal v-model="modal5" width="600" class="modal5">
      <p slot="header" style="color:#1c2438;text-align:left">
        <Icon type="ios-information-circle"></Icon>
        <span>修改绑定手机</span>
      </p>
    <Form ref="formValidate5" :model="formValidate" :rules="ruleValidate" :label-width="95" class="rbphonef">
      <div v-if="ind==1" class="rebindMstep1">
        <FormItem label='' prop='username' class='formItem'>
          <label class='rightTip text-center lh40' style="margin-left: -70px">您正在使用<span class="text--red">“手机验证码”</span>验证身份，请完成以下操作！</label>
        </FormItem>
        <FormItem label='手机号码：' prop='username' class='formItem'>
          <label class='rightTip text-center lh40 text--red'>{{formValidate.phone}}</label>
        </FormItem>
        <!-- 手机验证码 -->
        <FormItem label='验证码：' prop='phoneCode' class='formItem NumCode'>
            <Input type='text' v-model='formValidate.phoneCode' placeholder="请输入验证码"/>
            <Button disabled v-show='disabledBtn' class="getcode">{{time}}s后可重新获取</Button>
            <Button @click='getNumCode(1)' v-show='!disabledBtn' class="getcode">发送验证码</Button>
          <!--<label class='rightTip text-center'>请于2分钟内查收手机短信，并填写短信中的验证码</label>-->
        </FormItem>
      </div>

      <div  id="step2" class="dispnone">
        <inputItem
          :labelVal='{label:"新手机号"}'
          :model='formValidate'
          prop='NewPhone'
          ref='NewPhone'
          plh = '请输入您的手机号'
        />

        <!-- 图片验证码 -->
        <div class='publicInput'>
          <FormItem label='验证码：' prop='vcode' class='formItem'>
            <div class='NumCode inputvcode'>
              <Input class="fleft" type='text' v-model='formValidate.vcode' :placeholder="picCode"/>
              <img @click="handleRefreshCode" width="80" height="30" :src="'/dws/pub/vcode/img'" class="from_codes" id="verifyh"/>
            </div>
          </FormItem>
        </div>
        <!-- 图片验证码 end-->

        <!-- 手机验证码 -->
        <div class='publicInput'>
          <FormItem label='短信验证码：' prop='nPhoneCode' class='formItem'>
            <div class='NumCode'>
              <Input type='text' v-model='formValidate.nPhoneCode' :placeholder="phoneVcode"/>
              <Button disabled v-show='disabledBtn' class="getcode gtcods">{{time}}s后可重新获取</Button>
              <Button @click='getNumCode(2)' v-show='!disabledBtn' class="getcode gtcods">获取验证码</Button>
            </div>
            <!--<label class='rightTip text-center'>请于2分钟内查收手机短信，并填写短信中的验证码</label>-->
          </FormItem>
        </div>
      <!-- 手机验证码 end-->
      </div>
    </Form>
      <div slot="footer"  class="talignc"  id="bnewpb">
        <p class='errRemind'>{{reBindPerrMsg}}</p>
        <Button type="primary" size="large" class="butWid mcenter"  @click='Nexts("formValidate5")'>下一步</Button>
      </div>
      <div v-if="ind==3">
        <div id="bindNewPs">
          <div  class="setsuctitle"><span>恭喜您！手机重新绑定成功！</span></div>
          <div  class="setsuctip"><span>系统将在</span><span class="textred">{{fsecond}}</span>秒后自动自动关闭窗口，您可以选择<span class="relot" @click='relogin'>重新登录</span></div>
        </div>
      </div>
    </Modal>
  </header>
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
      showT: false,
      lookBindCa: '',
      picCode: '请输入图文验证码',
      phoneVcode: '请输入短信验证码',
      ind: '1',
      disabledBtn: false,
      time: 120,
      timer: null,
      showxlh: true,
      showSave: true,
      //logo: require('../assets/images/logo@2x.png'),
      logo: require('../assets/images/logofj.png'),
      caL_errMsg: '首次登录时，请下载并安装"CA证书客户端"，仅支持IE浏览器。',
      dsb : true,
      fruit:['（自动校验报名企业与绑定企业是否一致）'],
      entryt: 1,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
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
    this.getUnLoginInfohf()
    this.inifConfirPwd()
    this.loginStates()
  },
  methods: {
    ...mapActions(['bindNewPhone','gethfUnLoginInfo','loginOut','updatePwds','getSerials','getRandom','bindCa','validBindCa','userBaseM','getMobile','getPhoneCode','messageVali','verifPicCode']),
    loginStates() {
      let uid = sessionStorage.getItem('uuid')
      if(uid==null){
        //this.org_status = {}
        this.$store.state.org_status = {}
      }else{
        if(window.location.href.indexOf("login") == -1 && window.location.href.indexOf("register") == -1){ /*到首页和注册页时候不保存登陆信息*/
          console.log("返回不是首页也不是注册页")
          this.$store.state.org_status = this.$store.state.app
        }else{
          console.log("返回首页")
        }

      }
    },
    // 退出
    handleSetting(e) {
      let that = this
      switch (e.target.innerText.trim()) {
        case '退出':
          this.$Modal.confirm({
            title: '退出提示', content: '确定要退出程序吗！', onOk() {
              // 执行登出
              that.loginOut().then(res =>{
                if(res.success){
                  that.$router.push('/login')
                  that.modal2 = false
                }
              })
            }
          });
          break;
        case '绑定CA':
          this.openBindCa()
          break;
      }
    },
    // 获取权限
    getUnLoginInfohf() {
        // let url = window.location.href
        // if(url.indexOf("fj.html")!=-1){
        //   this.logo = require('../assets/images/logofj.png')
        //   this.showT = false
        // }
        this.gethfUnLoginInfo().then(res => {
          this.entryt = res
      })
    },
    //重新登陆
    relogin: function(){
      clearInterval(this.ftimer)
      this.modal3 = false
      this.loginOut()
      this.modal5 = false
      this.modal2 = false
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
            this.modal2 = false;
            this.modal3 = false;
            if(to==1){
              this.loginOut()
              this.$router.push('/login?tag=ca')
            }else if(to==2){
              this.modal5 = false
            }
          }
        }.bind(this),1000)
      }

    },
    //修改密码
    updatePwd() {
      this.$refs['formValidate'].validate(valid => {
          // 判断是否通过本地验证
        if (!valid) return
        let updata = {}
        updata.password = this.formValidate.userOldPassword
        updata.userpwd = this.formValidate.userNewPassword
        updata.userpwd2 = this.formValidate.confirmPwd

        this.updatePwds(updata).then(res => {
          if(res.success){
            document.getElementById("uppwd").style.display = "none"
            document.getElementById("subuppwd").style.display = "none"
            document.getElementById("uppwdnext").removeAttribute("class","dispnone");
            this.fiveCountd()
          }else {
            // 失败提醒
            this.errMsg = res.errcode
          }
        })

      })


    },
    //打开修改密码form
    openUpPwd() {
      this.modal2 = true
      this.$refs['formValidate'].resetFields()
      this.errMsg = ''
      this.formValidate.userOldPassword = ''
      this.formValidate.userNewPassword = ''
      this.formValidate.confirmPwd = ''
      document.getElementById("uppwd").style.display = "block"
      document.getElementById("subuppwd").style.display = "block"
      document.getElementById("uppwdnext").setAttribute("class","dispnone");
    },
    /*确认密码*/
    inifConfirPwd() {
      /*
    *  确认密码验证
    * */
      const validatePassCheck = (rule, value, callback) => {
        if (value !== this.formValidate.userNewPassword) {
          callback(new Error('新密码和确认密码输入不一致'))
        } else {
          callback()
        }
      }

      this.ruleValidate = {
        userOldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码为6-20位英文字母、数字的组合',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 20,
            message: '密码为6-20位英文字母、数字的组合',
            trigger: 'blur'
          }
        ],
        userNewPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            min: 6,
            message: '密码为6-20位英文字母、数字的组合',
            trigger: 'blur'
          },
          {
            type: 'string',
            max: 20,
            message: '密码为6-20位英文字母、数字的组合',
            trigger: 'blur'
          }
        ],
        confirmPwd: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ],
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
        ],
        phoneCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        nPhoneCode: [
          { required: true, message: '短信验证码不能为空', trigger: 'blur' }
        ],
        NewPhone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: validatejs.validatePhone, trigger: 'blur' }
        ]
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

      this.validBindCa().then(
        res => {
          console.log("已经绑定CA："+JSON.stringify(res))
          if(res.success){
            let conten = res.content
            this.formValidate.bindingOrg = conten.general_name
            this.formValidate.serialNum = conten.ca_cert
            this.formValidate.express = conten.ca_express
            this.showxlh = false
            this.showSave = false
            this.lookBindCa = true
          }
        },
        err => {
          console.log("未绑定CA："+JSON.stringify(err))
          this.formValidate.bindingOrg = ''
          this.formValidate.serialNum = ''
          this.formValidate.express = ''
          this.showxlh = true
          this.showSave = true
          this.lookBindCa = ''
        }
      )
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
            console.log(JSON.stringify(res))
            if(res.success){
              document.getElementById("caBindNext").removeAttribute("class","dispnone");
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
    },
    getBaseM() {
      this.modal4 = true
      this.userBaseM().then(
        res => {
          if(res.success){
            let conten = res.content
            this.formValidate.account = conten.account
            this.formValidate.realname = conten.realname
            this.formValidate.mobile = conten.mobile
            this.formValidate.personid = conten.personid
            this.formValidate.remark = conten.notes
            this.baseMaterError = ''
          }
        },
        err => {
          this.baseMaterError = res.errmsg
        }
      )

    },
    closeBaseM() {
      this.modal4 = false
    },
    openRebindM(name) {
      this.$refs[name].resetFields()
      this.modal5 = true
      this.ind = 1
      this.formValidate.phoneCode = ''
      this.reBindPerrMsg = ''

      this.formValidate.NewPhone = '13606917371'
      this.formValidate.nPhoneCode = '1'
      this.formValidate.vcode = '1'
      document.getElementById("step2").setAttribute("class","dispnone")

      document.getElementById("bnewpb").style.display = "block"
      this.disabledBtn = false
      this.getMobile().then(
        res => {
          console.log("已经绑定CA："+JSON.stringify(res))
          if(res.success){
            let mobile = res.content
            this.formValidate.phone = mobile
          }
        },
        err => {
          this.reBindPerrMsg = res.errmsg
        }
      )
    },
    /*
* 倒计时
* */
    getNumCode: function(types) {
      let upphone = ''
      if(types == 1){
        upphone = this.formValidate.phone
      }else if(types == 2){
        if(this.formValidate.NewPhone==''){
          this.reBindPerrMsg = '手机号不能为空'
          return
        }else {
          this.reBindPerrMsg = ''
        }
        upphone = this.formValidate.NewPhone
      }
      let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (phoneReg.test(upphone)) {
        this.disabledBtn = !this.disabledBtn
        this.time = 120
        clearInterval(this.timer)
        this.timer = null
        if (this.disabledBtn) {
          this.timer = setInterval(
            function () {
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
        this.getPhoneCode({
          mobile: upphone,
          types: 'reBindPhone'
        }).then(res => {
          if (res.success) {
            //this.formValidate.vcode = res.content.uuid;
          }
        })
      }
    },
    clearTime: function(){
      clearInterval(this.timer)
    },
    Nexts: function (name) {
      this.$refs[name].validate(valid => {
        if (!valid) return

        if(this.ind==1){/*校验旧手机验证码*/
          let updata = {}
          updata.verification = this.formValidate.phoneCode
          updata.mobile = this.formValidate.phone
          this.messageVali(updata).then(
            res => {
              console.log("first next："+JSON.stringify(res))
              if(res.success){
                this.ind=2
                this.reBindPerrMsg = ''
                this.disabledBtn = false
                document.getElementById("step2").removeAttribute("class","dispnone")
                this.handleRefreshCode()
                this.formValidate.NewPhone = ''
                this.formValidate.nPhoneCode = ''
                this.formValidate.vcode = ''
                this.clearTime()
              }
            },
            err => {
              this.reBindPerrMsg = err.errmsg
            }
          )
        }else if(this.ind==2){
          this.verifPicCode({code:this.formValidate.vcode}).then(res => {/*先校验图片验证码*/
            if(res.success){
              this.reBindPerrMsg = ''
              let updata = {}
              updata.newmobile = this.formValidate.NewPhone
              updata.verification = this.formValidate.nPhoneCode
              this.bindNewPhone(updata).then(
                res => {/*再校验新手机验证码*/
                  if (res.success) {
                    // 成功提醒
                    this.ind = 3
                    this.reBindPerrMsg = ''
                    this.handleRefreshCode()
                    document.getElementById("bnewpb").style.display = "none"
                    document.getElementById("step2").setAttribute("class","dispnone")
                    this.fiveCountd(2)
                    this.clearTime()
                  }
                },
                err => {
                  this.reBindPerrMsg = err.errmsg
                  this.handleRefreshCode()
                }
              )

            }else {
              this.reBindPerrMsg = res.errmsg
            }
          })
        }
      })
    },
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
      document.getElementById("verifyh").src = "/dws/pub/vcode/img?sessionKey ="+ this.mathRandow()
    },

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
      line-height: 40px;
      > * {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        height: 32px;
        width: 475px
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
