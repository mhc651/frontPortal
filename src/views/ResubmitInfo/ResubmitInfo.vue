<template>
  <div class="register">
    <div class="registerWrap">
      <div class="status">
        <div class="ltPortion"><span>审核结果：</span><span class="statusVal">{{auditStatus}}</span></div>
        <div class="rtPortion"><span>审核意见：</span><span class="statusVal">{{auditReason}}</span></div>
      </div>
        <Subtitle :subtitle="'企业信息'" style="margin-top: 30px;"/>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="245">
        <div class="registerInfo">
          <inputItem
            :labelVal="{label:'机构全称',tip:'与企业营业执照名称一致'}"
            :model="formValidate"
            prop="orgName"
          />
          <inputItem
            :labelVal="{label:'法人姓名',tip:'请填写法人姓名'}"
            :model="formValidate"
            prop="legalName"
          />
          <inputItem
            :labelVal="{label:'法人身份证号码',tip:'请填写法人身份证号码'}"
            :model="formValidate"
            prop="legalCardNo"
          />
          <inputItem
            :labelVal="{label:'统一社会信用代码/营业执照代码',tip:'请填写营业执照代码'}"
            :model="formValidate"
            :disabled="creditDisabled"
            prop="credit"
          />
          <inputItem
            :labelVal="{label:'执业许可证代码',tip:'请填写执业许可证代码'}"
            :model="formValidate"
            :disabled="licenceDisabled"
            prop="licence"
            v-if="false"
          />
          <div class="imgUpload">
            <label class="leftName" style="width: 245px;"><span>*</span>授权文件：</label>
            <div class="imgWrap">
              <ImgUploadItem
                :imgItem="{name:'营业执照'}"
                :folder="{'dir':'registerFile'}"
                :showImgUrl="formValidate.authFile[0] ? formValidate.authFile[0].src : ''"
                name="0"
                :required="true"
                @imgUrl="getUrl"
                :disabled='creditDisabled'
                v-if="!creditDisabled"
                @changeData="changeData"
                @bigImg = 'bigImg'
              />
              <ImgUploadItem
                :imgItem="{name:'组织机构代码'}"
                :folder="{'dir':'registerFile'}"
                :showImgUrl="formValidate.authFile[1] ? formValidate.authFile[1].src : ''"
                :disabled='creditDisabled'
                v-if="!creditDisabled"
                name="1"
                @imgUrl="getUrl"
                @changeData="changeData"
                @bigImg = 'bigImg'
              />
              <ImgUploadItem
                :imgItem="{name:'税务登记证'}"
                :folder="{'dir':'registerFile'}"
                :showImgUrl="formValidate.authFile[2] ? formValidate.authFile[2].src : ''"
                :disabled='creditDisabled'
                v-if="!creditDisabled"
                name="2"
                @imgUrl="getUrl"
                @bigImg = 'bigImg'
              />
              <ImgUploadItem
                :imgItem="{name:'执业许可证'}"
                :folder="{'dir':'registerFile'}"
                :showImgUrl="formValidate.authFile[3] ? formValidate.authFile[3].src : ''"
                :disabled='licenceDisabled'
                v-if="false"
                :required="true"
                name="3"
                @imgUrl="getUrl"
                @changeData="changeData"
                @bigImg = 'bigImg'
              />
              <ImgUploadItem
                :imgItem="{name:'法人身份证正面'}"
                :folder="{'dir':'registerFile'}"
                :showImgUrl="formValidate.authFile[4] ? formValidate.authFile[4].src : ''"
                name="4"
                :required="true"
                @imgUrl="getUrl"
                @changeData="changeData"
                @bigImg = 'bigImg'
              />
              <ImgUploadItem
                :imgItem="{name:'法人身份证反面'}"
                :folder="{'dir':'registerFile'}"
                :showImgUrl="formValidate.authFile[5] ? formValidate.authFile[5].src : ''"
                name="5"
                :required="true"
                @imgUrl="getUrl"
                @changeData="changeData"
                @bigImg = 'bigImg'
              />
              <ImgUploadItem
                :imgItem="{name:'企业授权函'}"
                :folder="{'dir':'registerFile'}"
                :showImgUrl="formValidate.authFile[6] ? formValidate.authFile[6].src : ''"
                name="6"
                :required="true"
                @changeData="changeData"
                @imgUrl="getUrl"
                @bigImg = 'bigImg'
              />
            </div>
            <label class="rightTip">
              <p>请按要求上传：</p>
              <p>1、扫描件上传，最大不超过5M</p>
              <p>2、企业请填写统一社会信息代码/营业执照代码并上传营业执照，医疗机构请填写执业许可证代码并上传执业许可证</p>
              <p>3、营业执照未变更为三证合一类型，请在此上传营业执照、组织机构代码和税务登记证</p>
              <p>4、<a :href="ossUrl+'/helpFile/企业授权书.docx'"  style="text-decoration: underline">企业授权模板.doc 下载</a></p>
            </label>
          </div>
        </div>
        <Subtitle :subtitle="'授权信息'"/>
        <div class="registerInfo">
          <inputItem
            :labelVal="{label:'被授权人姓名',tip:'请填写真实姓名'}"
            :model="formValidate"
            prop="realName"
          />
          <inputItem
            :labelVal="{label:'身份证号码',tip:'请填写身份证号码'}"
            :model="formValidate"
            prop="cardNo"
          />
          <inputItem
            :labelVal="{label:'手机号码',tip:'请填写手机号码'}"
            :model="formValidate"
            prop="phone"
            ref="phone"
          />
          <div class="verificationCode publicInput">
            <FormItem label="验证码：" prop="phoneCode" class="formItem">
              <div class="NumCode">
                <Input type="text" v-model="formValidate.phoneCode"/>
                <Button disabled v-show="disabledBtn">{{time}}s后可重新获取</Button>
                <Button @click="getNumCode" v-show="!disabledBtn">获取验证码</Button>
              </div>
              <label class="rightTip">请于2分钟内查收手机短信，并填写短信中的验证码</label>
            </FormItem>
          </div>
        </div>
      </Form>
      <Modal
        v-model="review"
        title=""
        width="60"
        @on-ok="reviewConfirm"
      >
        <div style="text-align: center">
          <img :src="reviewUrl" alt="" style="width: 100%">
        </div>
      </Modal>
      <div class="line"></div>
      <p class="errRemind">{{errMsg}}</p>
      <Button type="primary" class="registerBtn" @click="handleSubmit('formValidate')">提交审核</Button>
    </div>
  </div>
</template>
<script>
import {
  mapActions,
  mapState
} from 'vuex'
import callApi from '../../utils/callApi'
import inputItem from '../../components/complexInputItem'
import ImgUploadItem from '../../components/ImageUploadItem'
import MainTitle from '../../components/MaintItle'
import Subtitle from '../../components/Subtitle'

export default {
  name: 'Register',
  components: {
    inputItem,
    ImgUploadItem,
    MainTitle,
    Subtitle
  },
  watch: {
    creditDisabled (val) {
      if (val) {
        this.formValidate.imgObj['0'] = null
        this.formValidate.imgObj['1'] = null
        this.formValidate.imgObj['2'] = null
      }
    },
    licenceDisabled (val) {
      if (val) {
        this.formValidate.imgObj['3'] = null
      }
    }
  },
  data: function () {
    /*
      *  机构名称是否重复验证
      * */
    const validateOrgName = (rule, value, callback) => {
      this.validateOrgName({
        'orgName': value,
        'orgId': this.orgId
      }).then((res) => {
        if (res.content === 0) {
          callback()
        } else {
          callback(new Error('重复的机构名称'))
        }
      })
    }
    /**
     *  身份证位数验证
     */
    const cardNoCheck = (rule, value, callback) => {
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (reg.test(value) === false) {
        callback(new Error('身份证格式不正确'))
      } else {
        callback()
      }
    }
    /*
      *  判断为空
      * */
    const validateValCheck = function (rule, value, callback) {
      if (value !== '') {
        this.creditshow = true
        callback()
      } else {
        callback()
      }
    }.bind(this)
    const validateLicenceCheck = function (rule, value, callback) {
      if (value !== '') {
        this.licenceshow = true
        this.creditshow = false
        callback()
      } else {
        this.licenceshow = false
        this.creditshow = true
        callback()
      }
    }.bind(this)
    /*
      * 手机号格式、是否重复验证
      * */
    const validatePhone = (rule, value, callback) => {
      let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (phoneReg.test(value)) {
        this.validatePhone({
          'phone': value,
          'userId': this.userId
        }).then((res) => {
          if (res.content === 0) {
            callback()
          } else {
            callback(new Error('该手机号码已注册'))
          }
        })
      } else {
        callback(new Error('手机号码格式不正确'))
      }
    }
    // 二选一
    const licenceDisabled = (rule, value, callback) => {
      if (value) {
        this.licenceDisabled = true
        callback()
      } else {
        this.licenceDisabled = false
        callback()
      }
    }
    const creditDisabled = (rule, value, callback) => {
      if (value) {
        this.creditDisabled = true
        callback()
      } else {
        this.creditDisabled = false
        callback()
      }
    }
    return {
      id: '', // 当前机构id
      orgId: '', // 机构id
      userId: '', // 用户id
      auditStatus: '', // 审核状态
      auditReason: '', // 审核意见
      review: false,
      licenceDisabled: false,
      creditDisabled: false,
      showImg: false,
      src: '',
      creditshow: true,
      licenceshow: false,
      disabledBtn: false,
      time: 180,
      timer: null,
      err: false,
      errMsg: '',
      reviewUrl: '', // 存放预览图片
      formValidate: {
        orgName: '',
        legalName: '',
        legalCardNo: '',
        credit: '',
        licence: '',
        authFile: '',
        realName: '',
        cardNo: '',
        phone: '',
        phoneCode: '',
        password: '',
        imgObj: {}
      },
      ruleValidate: {
        orgName: [
          {required: true, message: '企业名称不能为空', trigger: 'blur'},
          {validator: validateOrgName, trigger: 'blur'}
        ],
        legalName: [
          {required: true, message: '法人姓名不能为空', trigger: 'blur'}
        ],
        legalCardNo: [
          {required: true, message: '法人身份证号码不能为空', trigger: 'blur'},
          {validator: cardNoCheck, trigger: 'blur'}
        ],
        credit: [
          {required: true, message: '统一社会信用代码/营业执照代码不能为空', trigger: 'blur'},
          {validator: validateValCheck, trigger: 'blur'},
          {validator: licenceDisabled, trigger: 'change'}
        ],
        licence: [
          {validator: validateLicenceCheck, trigger: 'blur'},
          {validator: creditDisabled, trigger: 'change'}
        ],
        realName: [
          {required: true, message: '被授权人姓名不能为空', trigger: 'blur'}
        ],
        cardNo: [
          {required: true, message: '身份证号码不能为空', trigger: 'blur'},
          {validator: cardNoCheck, trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '手机号码不能为空', trigger: 'blur'},
          {validator: validatePhone, trigger: 'blur'}
        ],
        phoneCode: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    ...mapState([
      'app',
      'ossUrl'
    ])
  },
  mounted: function () {
    this.getOssUrl()
    callApi('org/orgDetail', 'POST', {}, true)
      .then((res) => {
        if (res.success) {
          let vals = res.content.orgInfoDo
          this.id = vals.id
          this.orgId = vals.orgId
          this.formValidate.authFile = JSON.parse(vals.authFile)
          this.formValidate.imgObj = JSON.parse(vals.authFile)
          this.formValidate.orgName = vals.orgName
          this.formValidate.legalName = vals.legalName
          this.formValidate.legalCardNo = vals.legalCardNo
          this.formValidate.credit = vals.credit
          this.formValidate.licence = vals.licence
          this.userId = res.content.orgUserInfo.id
          this.formValidate.realName = res.content.orgUserInfo.realName
          this.formValidate.cardNo = res.content.orgUserInfo.cardNo
          this.formValidate.phone = res.content.orgUserInfo.phone
          this.auditStatus = vals.auditStatus === '01' ? '未提交' : vals.auditStatus === '02' ? '待审核' : vals.auditStatus === '03' ? '审核中' : vals.auditStatus === '20' ? '审核通过' : '审核不通过'
          this.auditReason = vals.auditReason
        }
      })
  },
  methods: {
    ...mapActions([
      'validateOrgName',
      'validatePhone',
      'getPhoneCode',
      'resubmit',
      'getOssUrl'
    ]),
    reviewConfirm () {
      this.review = false
    },
    // 显示大图
    bigImg (url) {
      this.review = true
      this.reviewUrl = url
      // this.$Modal.info({
      //   width: '1000px',
      //   closable: true,
      //   render: (h) => {
      //     return (
      //       <div>
      //         {url}
      //         <img src={url} style="width:100%"/>
      //       </div>
      //     )
      //   }
      // })
    },
    /*
      *  图片拼接
      * */
    getUrl: function (url) {
      if (url.filename.length) {
        this.formValidate.imgObj[url.name] = {
          filename: url.filename,
          src: url.src
        }
      } else {
        this.formValidate.imgObj[url.name] = null
      }
    },
    changeData: function (data) {
      this.src = data.src
      this.showImg = data.showImg
    },
    /*
      * 倒计时
      * */
    getNumCode: function () {
      let phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      if (phoneReg.test(this.formValidate.phone)) {
        this.disabledBtn = !this.disabledBtn
        this.time = 180
        clearInterval(this.timer)
        this.timer = null
        if (this.disabledBtn) {
          this.timer = setInterval(function () {
            this.time--
            if (this.time === 0) {
              this.disabledBtn = !this.disabledBtn
              this.time = 180
              clearInterval(this.timer)
            }
          }.bind(this), 1000)
        }
        this.getPhoneCode({
          'phone': this.formValidate.phone
        }).then((res) => {
          if (res.success) {
            this.formValidate.uuid = res.content.uuid
          }
        })
      } else {
        return false
      }
    },
    /*
      * 注册提交
      * */
    handleSubmit: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if ((!this.formValidate.credit && !this.formValidate.licence)) {
            alert('企业请填写统一社会信用代码/营业执照代码并上传营业执照，医疗机构请填写执业许可证号并上传执业许可证')
            return false
          }
          if ((!this.formValidate.imgObj['0'] && !this.formValidate.imgObj['3'])) {
            alert('请按照要求上传授权文件')
            return false
          }
          if (!this.formValidate.imgObj['4'] || !this.formValidate.imgObj['5'] || !this.formValidate.imgObj['6']) {
            alert('请按照要求上传授权文件')
            return false
          }
          this.formValidate.authFile = JSON.stringify(this.formValidate.imgObj)
          let registerInfo = {
            'orgInfo': {
              'id': this.id,
              'orgId': this.orgId,
              'orgName': this.formValidate.orgName,
              'legalName': this.formValidate.legalName,
              'legalCardNo': this.formValidate.legalCardNo,
              'credit': this.formValidate.credit,
              'licence': this.formValidate.licence,
              'authFile': this.formValidate.authFile
            },
            'orgUser': {
              'id': this.userId,
              'realName': this.formValidate.realName,
              'cardNo': this.formValidate.cardNo,
              'phone': this.formValidate.phone,
              'phoneCode': this.formValidate.phoneCode,
              'uuid': this.formValidate.uuid
            }
          }
          this.resubmit(registerInfo)
            .then((res) => {
              if (res) {
                sessionStorage.setItem('app', JSON.stringify(this.app))
                this.$router.push('/auditcheck')
              }
            }, (res) => {
              this.errMsg = res.errmsg
              this.formValidate.authFile = this.formValidate.imgObj
            })
        }
      })
    }
  }
}

</script>
<style src="../Register/Register.scss" lang="scss"></style>
