// /**注册页面模版 */
<style lang="scss" scoped>
.page-title {
  margin-top: 30px;
}
.tdo{border: 1px solid #e4e7ed;width: 220px;min-height: 50px;font-size: 14px}
.tdt{border: 1px solid #e4e7ed;min-height: 50px;font-size: 14px}
</style>

<template>
  <div class='register container'>
    <!-- look 进入查看模式 -->
    <div class='registerWrap' :class='look?"form---disabled":""'>
      <!-- head title -->
      <MainTitle :mainTitle='title' class='page-title'/>
      <!-- head title end-->
      <!-- 审核状态 -->
      <!--<div class="register-state" v-if="formValidate.auditStatus!=-1 && formValidate.auditStatus!=0">-->
        <!--<div class="stateDiv">-->
          <!--&lt;!&ndash;<span>{{org_status}}</span>&ndash;&gt;-->
          <!--<span>审核状态：</span>-->
          <!--<span class="text&#45;&#45;red" v-if="formValidate.auditStatus == '1' || org_status.status=='待审核'">-->
            <!--待审核-->
          <!--</span>-->
          <!--<span class="text&#45;&#45;red" v-else-if="formValidate.auditStatus == '2' " >-->
            <!--审核中-->
          <!--</span>-->
          <!--<span class="text&#45;&#45;red" v-else-if="formValidate.auditStatus == '4' " >-->
            <!--审核未通过-->
          <!--</span>-->
        <!--</div>-->
        <!--<div class="auditDesc" v-if="auditDesc!=1"><span>审核意见：</span><span>{{auditDesc}}</span></div>-->
      <!--</div>-->

      <table v-if="formValidate.auditStatus!=-1 && formValidate.auditStatus!=0" class="register-state" cellspacing="0">
        <tr>
          <td class="tdo">
            <div class="stateDiv2">
              <!--<span>{{org_status}}</span>-->
              <span>审核状态：</span>
              <span class="text--red" v-if="formValidate.auditStatus == '1' || org_status.status=='待审核'">
                待审核
              </span>
              <span class="text--red" v-else-if="formValidate.auditStatus == '2' " >
                审核中
              </span>
              <span class="text--red" v-else-if="formValidate.auditStatus == '4' " >
                审核未通过
              </span>
            </div>
          </td>
          <td class="tdt" v-if="formValidate.auditStatus != '1'">
            <div class="auditDesc2" v-if="auditDesc!=1"><span>审核意见：</span><span>{{auditDesc}}</span></div>
          </td>
          <td v-else width="70%"></td>
        </tr>
      </table>

      <div class="register-state" v-if="formValidate.auditStatus==0">
        <div class="stateDiv">
          <div class="fleft">
            企业资料
          </div>
          <div style="width: 50px;" class="text--red fleft">待提交</div><div class="fleft">，请提交审核！</div>
        </div>
      </div>



      <!-- 审核状态 end-->
      <Subtitle subtitle='企业信息' class='page-title'/>
      <Form ref='formValidate' :model='formValidate' :rules='ruleValidate' :label-width='245'>
        <div class='registerInfo'>
          <inputItem
            :labelVal='{label:"企业名称",tip:"与企业营业执照名称一致"}'
            :model='formValidate'
            prop='orgName'
          />
          <inputItem
            :labelVal='{label:"法人姓名",tip:"请填写法人姓名"}'
            :model='formValidate'
            prop='legalName'
          />
          <!-- <inputItem
            :labelVal='{label:"法人身份证号码",tip:"请填写法人身份证号码"}'
            :model='formValidate'
            prop='legalCardNo'
          /> -->
          <inputItem v-if="ruleValidate.licenseNumber"
            :labelVal='{label:"执业许可证号",tip:"请填写执业许可证号"}'
            :model='formValidate'
            prop='licenseNumber'
          />
          <inputItem v-if="ruleValidate.credit"
            :labelVal='{label:"统一社会信用代码/营业执照代码",tip:"请填写营业执照代码"}'
            :model='formValidate'
            prop='credit'
          />
          <div class='imgUpload'>
            <label class='leftName' style='width: 245px;'><span>*</span>授权文件：</label>
            <div class='imgWrap'>
               <ImgUploadItem v-for='(val, key) in imgObj' :key='key'
                  :imgItem='val.imgItem'
                  :folder='{dir:"registerFile"}'
                  :name='key'
                  :required='val.required'
                  @imgUrl='getUrl'
                  :validate ='val.validate'
                  :setData = 'val.content'
                />
            </div>
            <label class='rightTip'>
              <p>请按要求上传：</p>
              <p>1、扫描件原件并上传，最大不超过5M</p>
              <!-- <p>2、企业请填写统一社会信息代码/营业执照代码并上传营业执照，医疗机构请填写执业许可证代码并上传执业许可证</p> -->
              <p v-if="formValidate.regState !== 'hos'">2、营业执照未变更为三证合一类型，请在此上传营业执照、组织机构代码和税务登记证
              </p>
              <p  v-if="formValidate.regState !== 'hos'">(已变更三证合一，只需上传营业执照)</p>
              <p>
                {{ formValidate.regState !== 'hos'?'3':'2' }}、
                <a href='https://bucket-tools.oss-cn-beijing.aliyuncs.com/tools/%E6%8E%88%E6%9D%83%E4%B9%A6.docx'  style='text-decoration: underline;color:#2d8cf0' download>授权书下载</a></p>
            </label>
          </div>
        </div>
        <Subtitle subtitle='授权信息' :tip='{val:"温馨提示：",color:"#f00"}' small ='被授权人手机号码需实名制通过。未通过的建议带上有效的身份证件,然后到运营商的营业厅进行核实,如果没有通过,可以直接办理实名认证业务。'/>
        <div class='registerInfo'>
          <inputItem
            :labelVal='{label:"被授权人姓名",tip:"请填写真实姓名"}'
            :model='formValidate'
            prop='authUserRealName'
          />
          <inputItem
            :labelVal='{label:"身份证号码",tip:"请填写身份证号码"}'
            :model='formValidate'
            prop='authUserCardNo'
          />
          <inputItem
            :labelVal='{label:"手机号码",tip:"请填写授权人实名认证的手机号码"}'
            :model='formValidate'
            prop='authUserPhoneNo'
            ref='phone'
          />
          <!-- 手机验证码 -->
          <div v-if="ruleValidate.authUserPhoneVcode" class='verificationCode publicInput'>
            <FormItem label='验证码：' prop='authUserPhoneVcode' class='formItem'>
              <div class='NumCode'>
                <Input type='text' v-model='formValidate.authUserPhoneVcode'/>
                <Button disabled v-show='disabledBtn'>{{time}}s后可重新获取</Button>
                <Button @click='getNumCode' v-show='!disabledBtn'>获取验证码</Button>
              </div>
              <label class='rightTip'>请于2分钟内查收手机短信，并填写短信中的验证码</label>
            </FormItem>
          </div>
          <!-- 密码单元 -->
          <inputItem v-if="ruleValidate.authUserPassword"
            :labelVal='{label:"密码",tip:"密码为6-20位英文字母、数字的组合"}'
            :model='formValidate'
            prop='authUserPassword'
            inputType='password'
          />
          <inputItem  v-if="ruleValidate.authUserPassword"
            :labelVal='{label:"确认密码",tip:"请确保两次密码输入一致"}'
            :model='formValidate'
            prop='confirmPwd'
            inputType='password'
          />
          <!-- 密码单元 end-->

          <div class='verificationCode' v-if='false'>
            <label style='width: 245px'></label>
            <div class='agreement'>
              <Checkbox class='checkbox' size='large'>我已阅读并同意</Checkbox>
              <div class='article'>《信息真实性协议》</div>
            </div>
          </div>
        </div>
      </Form>
      <!-- 审核完毕 -->
      <div v-if="false">
        <Subtitle subtitle='审核信息'/>
      </div>
      <!-- 审核完毕 end-->
      <!-- 注册 -->
      <div class='line'></div>
      <p class='errRemind'>{{errMsg}}</p>
      <Button :disabled='post' v-if="!look" type='primary' class='registerBtn' @click='handleSubmit("formValidate")'>{{ reset? '重新提交':'立即注册' }}</Button>
       <Button v-else type='primary' class='registerBtn' @click='$router.go(-1)'>返回上一级</Button>
      <!-- 注册 end-->
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import inputItem from '../../components/complexInputItem'
import ImgUploadItem from '../../components/ImageUploadItem'
import MainTitle from '../../components/MaintItle'
import Subtitle from '../../components/Subtitle'
import validatejs from '../../assets/js/validate'
import uuids from '../../assets/js/common'

export default {
  name: 'Register',
  components: {
    inputItem,
    ImgUploadItem,
    MainTitle,
    Subtitle
  },
  props: {
    // 页面模式
    mode: {}
  },
  data() {
    let config = {
      // 查看模式
      look: '',
      // 是否拦截提交1
      post: false,
      // src: '',
      // 倒计时器
      disabledBtn: false,
      time: 180,
      timer: null,
      // 倒计时器 end
      err: false,
      // 服务器返回提示
      errMsg: '',
      reviewUrl: '', // 存放预览图片
      // 重新提交
      reset: false,
      // 表单
      formValidate: {
        // 注册状态 m 为医疗机构
        regState: '',
        // 审核状态
        auditStatus: '-1',
        orgName: '',
        legalName: '',
        // legalCardNo: '',
        //  执业许可证号(医疗机构才有)
        licenseNumber: '',
        credit: '',
        authFile: '',
        authUserRealName: '',
        authUserCardNo: '',
        authUserPhoneNo: '',
        authUserPhoneVcode: '',
        authUserPassword: '',
        confirmPwd: ''
      },
      // 图片集合
      imgObj: {},
      ruleValidate: {},
      auditDesc:1
    }

    // 注册配置  end
    return {
      ...config
    }
  },
  computed: {
    ...mapState(['org_status', 'app']),
    title() {
      let name = '企业机构注册'
      console.log(this.mode)
      if (this.mode) name = '医疗机构注册'
      return name
    }
  },
  watch: {
    mode(v) {
      // 修改页面配置
      // this.inifConfig()
      // this.resetForm()
    }
  },
  created() {
    this.goBack()
    this.inifConfig()
    // 查看模式
    if (this.$route.query.look === '1') {

      // this.$set(this.imgObj, 'license_file', {
      //   imgItem: { name: '执业许可证' },
      //   required: true,
      //   content: '',
      //   validate: validateImg
      // })
      // this.$set(this.imgObj, 'auth_file', {
      //   imgItem: { name: '企业授权文件' },
      //   required: true,
      //   content: '',
      //   validate: validateImg
      // })

      this.look = 1

      let uname = document.getElementById("username").innerHTML
      this.getOrgInfo({mode:this.mode,username:uname}).then(res => {
        let data = res.content
        // 表单
        for (let key in data) {
          let val = data[key]
          if (val) {
            if(key=='name'){
              this.formValidate['orgName'] = val
            }else if(key=='legal_person'){
              this.formValidate['legalName'] = val
            }else if(key=='license_number'){
              this.formValidate['licenseNumber'] = val
            }else if(key=='realname'){
              this.formValidate['authUserRealName'] = val
            }else if(key=='personid'){
              this.formValidate['authUserCardNo'] = val
            }else if(key=='mobile'){
              this.formValidate['authUserPhoneNo'] = val
            }else if(key=='credit'){
              this.formValidate['credit'] = val
            }
          }
        }
        this.formValidate['auditStatus'] = this.org_status.flag
        if(data.audit_desc != null){
          this.auditDesc =data.audit_desc
        }
        // 图片
        for (let key in this.imgObj) {
          let obj = data[key]
          if (obj) {
            this.imgObj[key].content = obj
          }
        }
      })
    }
    if (this.$route.query.reset === '1') {
      // 回填数据
      // 获取数据
      let uname = '';
      if(document.getElementById("username")!=null){
        uname = document.getElementById("username").innerHTML
      }else{
        uname = this.org_status.account
      }
      this.getOrgInfo({mode:this.mode,username:uname}).then(res => {
        let data = res.content
        // 表单
        for (let key in data) {
          let val = data[key]
          if (val) {
            if(key=='name'){
              this.formValidate['orgName'] = val
            }else if(key=='legal_person'){
              this.formValidate['legalName'] = val
            }else if(key=='license_number'){
              this.formValidate['licenseNumber'] = val
            }else if(key=='realname'){
              this.formValidate['authUserRealName'] = val
            }else if(key=='personid'){
              this.formValidate['authUserCardNo'] = val
            }else if(key=='mobile'){
              this.formValidate['authUserPhoneNo'] = val
            }else if(key=='credit'){
              this.formValidate['credit'] = val
            }
          }
        }
        if(this.$route.query.flag){
          this.formValidate.auditStatus = 0
        }else {
          this.formValidate.auditStatus = this.org_status.flag
          //alert(JSON.stringify(this.org_status))
        }
        //alert(this.formValidate.auditStatus)
        if(data.audit_desc != null){
          this.auditDesc =data.audit_desc
        }
        // 图片
        for (let key in this.imgObj) {
          let obj = data[key]
          if (obj) {
            this.imgObj[key].content = obj
          }
        }
      })
      this.reset = true
    }
  },
  methods: {
    ...mapActions(['getPhoneCode', 'register', 'getOrgInfo']),
    goBack() {
      let uid = sessionStorage.getItem('uuid')
      if(uid!=null){
        if(JSON.stringify(this.$store.state.org_status) == "{}"){
          this.$store.state.org_status = this.$store.state.app
        }
      }
    },
    /**
     * 注册配置
     * */
    inifConfig() {
      /*
    *  确认密码验证
    * */
      const validatePassCheck = (rule, value, callback) => {
        if (value !== this.formValidate.authUserPassword) {
          callback(new Error('密码和确认密码输入不一致'))
        } else {
          callback()
        }
      }
      // form validate config
      let validateConfig = {
        orgName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
          // { validator: validateOrgName, trigger: "blur" }
        ],
        legalName: [
          { required: true, message: '法人姓名不能为空', trigger: 'blur' }
        ],
        legalCardNo: [
          {
            required: true,
            message: '法人身份证号码不能为空',
            trigger: 'blur'
          },
          { validator: validatejs.validateIdCard, trigger: 'blur' }
        ],
        authUserRealName: [
          { required: true, message: '被授权人姓名不能为空', trigger: 'blur' }
        ],
        authUserCardNo: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          { validator: validatejs.validateIdCard, trigger: 'blur' }
        ],
        authUserPhoneNo: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { validator: validatejs.validatePhone, trigger: 'blur' }
        ]
      }

      // 非查看模式
      if (this.$route.query.look !== '1') {
        validateConfig.authUserPhoneVcode = [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
      // 进入重新提交状态
      if (this.$route.query.reset == null && this.$route.query.look == null) {
        // 注册状态

        validateConfig.authUserPassword = [
          { required: true, message: '密码不能为空', trigger: 'blur' },
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
        ]
        validateConfig.confirmPwd = [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      } else {
        // 编辑状态不需要密码
        //validateConfig.regState = 'update'
      }

      // 图片验证
      const validateImg = function(val) {
        if (!validatejs.validateImg(val.name)) {
          this.$Modal.error({
            title: '错误',
            content: '图片格式错误！'
          })
          return false
        } else if (val.size > 1024 * 1024 * 5) {
          this.$Modal.error({
            title: '错误',
            content: '最大上传5M！'
          })
          return false
        }
      }
      // empty validate
      this.$set(this, 'ruleValidate', {})
      this.$set(this, 'imgObj', {})
      if (this.mode == 1) {
        if (this.$route.query.reset !== '1') {
          this.formValidate.regState = 'hos'
        }else {
          this.formValidate.regState = 'updatehos'
        }
        // 医疗机构
        this.$set(this.ruleValidate, 'licenseNumber', [
          { required: true, message: ' 执业许可证号不为空', trigger: 'blur' }
        ])

        // 图片文件

        this.$set(this.imgObj, 'license_file', {
          imgItem: { name: '执业许可证' },
          required: true,
          content: '',
          validate: validateImg
        })
        this.$set(this.imgObj, 'auth_file', {
          imgItem: { name: '企业授权文件' },
          required: true,
          content: '',
          validate: validateImg
        })
      } else {
        // 企业机构
        if (this.$route.query.reset == '1') {
          this.formValidate.regState = 'update'
        }

        this.$set(this.ruleValidate, 'credit', [
          {
            required: true,
            message: ' 统一社会信用代码/营业执照代码不能为空',
            trigger: 'blur'
          }
        ])
        //file img
        this.$set(this.imgObj, 'buz_licence_file', {
          imgItem: { name: '营业执照文件' },
          required: true,
          content: '',
          validate: validateImg
        })
        this.$set(this.imgObj, 'organization_file', {
          imgItem: { name: '组织机构代码证文件' },
          content: '',
          validate: validateImg
        })
        this.$set(this.imgObj, 'tax_file', {
          imgItem: { name: '税务登记证' },
          content: '',
          validate: validateImg
        })
        this.$set(this.imgObj, 'auth_file', {
          imgItem: { name: '企业授权函' },
          required: true,
          content: '',
          validate: validateImg
        })
      }
      // set validate
      for (let k in validateConfig) {
        this.$set(this.ruleValidate, k, validateConfig[k])
      }
    },
    /**
     * 重置表单
     */
    resetForm() {
      // reset form
      this.$refs['formValidate'].resetFields()
    },
    /*
    *  图片拼接
    * */
    getUrl: function(url) {
      this.imgObj[url.name]['content'] = url
    },
    // changeData: function(data) {
    //   this.src = data.src
    //   this.showImg = data.showImg
    // },
    /*
    * 倒计时
    * */
    getNumCode: function() {
      let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (phoneReg.test(this.formValidate.authUserPhoneNo)) {
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
        let ntype = ''
        if(this.reset){
          ntype = 'registerReset'
        }else{
          ntype = 'register'
        }
        // 获得验证码
        this.getPhoneCode({
          mobile: this.formValidate.authUserPhoneNo,
          types: ntype
        }).then(res => {
          if (res.success) {
            // this.formValidate.uuid = res.content.uuid;
          }
        })
      } else {
        return false
      }
    },
    /*
    * 注册提交
    * */
    handleSubmit() {
      //console.log(this.formValidate)
      this.$refs['formValidate'].validate(valid => {
        // 判断是否通过本地验证
        if (!valid) return
        // param
        let registerInfo = this.formValidate
        let updata = {
          name: registerInfo.orgName,
          legal_person: registerInfo.legalName,
          license_number: registerInfo.licenseNumber,
          realname: registerInfo.authUserRealName,
          personID: registerInfo.authUserCardNo,
          mobile: registerInfo.authUserPhoneNo,
          verification: registerInfo.authUserPhoneVcode,
          userpwd: registerInfo.authUserPassword,
          userpwd2: registerInfo.confirmPwd,
          regState: registerInfo.regState,
          credit: registerInfo.credit
        }
        // 全授权文件判断
        let isImg = 1
        for (let k in this.imgObj) {
          let obj = this.imgObj[k]
          if (obj.required && !obj.content) {
            isImg = null
            // 获得名称并提示
            this.errMsg = obj.imgItem.name + '不能为空!'
            break
          }
          // set img id of the formdate
          updata[k] = obj.content.id
        }
        if (!isImg) return
        // 清空提示
        this.errMsg = ''
        this.post = true
        console.log(JSON.stringify(updata))

        const now_uuid = uuids.reuuid()
        if(sessionStorage.getItem("uuid")==null){
          sessionStorage.setItem("uuid",now_uuid)
        }
        this.register(updata).then(
          res => {
            this.post = false
            // 注册成功
            if (this.reset) {
              this.$router.push('/review?mode='+this.mode)
            } else {
              this.$router.push('/register-success?mode='+this.mode)
            }
          },
          res => {
            // 注册失败
            this.errMsg = res.errmsg
            this.post = false
          }
        )
      })
    }
  }
}
</script>
<style src='../../assets/css/style.scss' lang='scss'></style>
<style src='./Register.scss' lang='scss'></style>
