<template>
  <div class="ProductDeclare">
    <div class="ProductDeclareWrap">
      <MainTitle class="mainTitle" mainTitle="提交耗材产品申报应用授权资料" />
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150" style="padding: 0 50px;">
        <Row>
          <Col span="10">
            <inputItem
              :labelVal="{label:'企业名称'}"
              :model="formValidate"
              :disabled="true"
              prop="name"
            />
          </Col>
          <Col span="24">
            <FormItem label="企业类型" class="checkboxGroup" prop="orgTypeId">
              <CheckboxGroup v-model="formValidate.orgTypeId" @on-change="handleChange">
                <Checkbox v-for="item in checkboxArr" :label="item.id" :key="item.id" disabled>{{item.orgTypeName}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="license">
          <Col span="12">
          <inputItem
            :labelVal="{label:'生产许可证'}"
            :model="formValidate"
            :disabled="true"
            prop="licenseNum"
          />
          </Col>
          <Col span="12">
            <FormItem class='publicInput' label="生产许可证有效期至：" prop="licenseValidDate">
              <DatePicker type="date" v-model="formValidate.licenseValidDate" disabled style="width: 100%"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="manage">
          <Col span="12">
            <inputItem
              :labelVal="{label:'经营许可证'}"
              :model="formValidate"
              :disabled="true"
              prop="businessNum"
            />
          </Col>
          <Col span="12">
            <FormItem class='publicInput' label="经营许可证有效期至：" prop="businessValidDate">
              <DatePicker type="date" disabled v-model="formValidate.businessValidDate" style="width: 100%"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="所在地区：" class="publicInput cascader">
              <Cascader :data="addressDates" disabled v-model="formValidate.addressCode"></Cascader>
            </FormItem>
          </Col>
          <Col span="12">
            <inputItem
              :labelVal="{label:'联系地址'}"
              :model="formValidate"
              :disabled="true"
              prop="address"
            />
          </Col>
        </Row>
      </Form>
      <div class="materialsWrap">
        <Row>
          <Col span="5">
            <Menu theme="light" :active-name="indexNum" width="auto" @on-select="itemSelected">
              <MenuItem :class="{'ivu-menu-item-active':item.id === indexNum}" v-for="(item,index) in menuArr" :name="item.id" :key="index">
                <div>
                  <p><label class="sign">*</label>{{ item.qualificationName }}</p>
                  <p></p>
                </div>
              </MenuItem>
            </Menu>
          </Col>
          <Col span="19">
            <div class="itemContent" v-for="(item,index) in menuArr"  v-show="indexNum === item.id" :key="index">
              <a class="downLoad" href="javascript:;" v-if="item.id === '3'"><Icon type="ios-cloud-download"></Icon>  授权委托证明书模板.doc</a>
              <p class="reminder" v-if="remind[item.id]">
                {{remind[item.id]}}
              </p>
              <Button type="primary" @click="handleDownloadZip(index, item.qualificationName)">下载全部</Button>
              <div class="imgWrap">
                <div class="img" v-for="(file, key, index) in imgsObj[item.id] ? imgsObj[item.id].fileList :{}" :key="index">
                  <div class="shade">
                    <div></div>
                    <Icon type="eye" class="trash" @click.native="showBigImg(item.id, file.url)"></Icon>
                  </div>
                  <img :src="ossUrl+'/'+file.url" />
                </div>
                <simpleUploadItem
                :folder="{'dir':'productDeclare'}"
                :itemId="item.id"
                @imgUrl="getImgs"
                v-if="false"
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
    <div class="imaginaryLine"></div>
    <div class="btnWrap">
      <Button type="primary" class="sendAuditBtn" @click="back()">返回</Button>
    </div>
    <Modal
      v-model="review"
      title=""
      width="70"
      :styles="{maxHeight: '550px', overflowY: 'scroll'}"
      class-name="product-model"
      @on-ok="reviewConfirm"
    >
      <div style="text-align: center">
        <img :src="reviewUrl" alt="" style="width: 100%">
      </div>
    </Modal>
  </div>
</template>
<script>
import callApi from '../../utils/callApi'
import {mapState, mapActions} from 'vuex'
import MainTitle from '../../components/MaintItle'
import inputItem from '../../components/complexInputItem'
import simpleUploadItem from '../../components/simpleUploadItem'
import {data} from '../../data'
import concat from 'lodash/concat'
import uniqBy from 'lodash/uniqBy'
import hx from '../../utils/tools'

export default {
  name: 'LookProductDeclare',
  data: function () {
    return {
      reviewUrl: '', // 保存预览图片
      manage: false, // 经营许可证/有效期显示隐藏
      license: false, // 生产许可证/有效期显示隐藏
      mandatoryArr: [], // 菜单栏id数组
      review: false,
      id: '',
      remind: {
        '1': '温馨提示：1、营业执照未变更为三证合一类型，请在此上传营业执照、组织机构代码和税务登记证； 2、需提供正副本复印件。',
        '2': '温馨提示：1、需提供正反面原件复印件。',
        '3': '温馨提示：1、《法定代表人授权委托书》（原件）和《身份证》（正、反面复印件）,社保缴交证明（复印件）。'
      },
      formValidate: {
        name: '',
        orgTypeId: [],
        licenseNum: '',
        licenseValidDate: '',
        businessNum: '',
        businessValidDate: '',
        addressCode: [],
        address: ''
      },
      auditStatus: '', // 审核状态
      ruleValidate: {
        orgTypeId: [
          {required: true, type: 'array', min: 1, message: '选择企业类型', trigger: 'change'}
        ],
        licenseNum: [
          {required: true, message: '生产(经营)许可证不能为空', trigger: 'blur'}
        ],
        licenseValidDate: [
          {required: true, type: 'date', message: '许可证有效期不能为空', trigger: 'change'}
        ],
        businessNum: [
          {required: true, message: '经营许可证不能为空', trigger: 'blur'}
        ],
        businessValidDate: [
          {required: true, type: 'date', message: '经营许可证有效期不能为空', trigger: 'change'}
        ],
        addressCode: [
          {required: true, type: 'array', min: 1, message: '所在地区不能为空', trigger: 'change'}
        ]
        // address: [
        //   {required: true, message: '联系地址不能为空', trigger: 'blur'}
        // ]
      },
      indexNum: '1',
      addressDates: data,
      checkboxArr: [], // 企业类型
      menuArr: [], // 左侧菜单
      imgsObj: {}, // 资质图片组
      arr: [], // 保存图片数组
      appId: ''
    }
  },
  components: {
    MainTitle,
    inputItem,
    simpleUploadItem
  },
  computed: {
    ...mapState([
      'ossUrl',
      'app_list_status'
    ])
  },
  mounted () {
    this.getOssUrl()
    this.getInfo()
    this.getAppApplyStatus({
      appId: this.$route.params.id
    })
  },
  methods: {
    ...mapActions([
      'getOssUrl',
      'submitProductDeclare',
      'getAppApplyStatus'
    ]),
    handleDownloadZip (index, name) {
      let aliUrls = []
      for (let v of this.imgsObj[++index].fileList) {
        let obj = Object.assign({}, {
          url: `${this.ossUrl}/${v.url}`,
          fileName: `${v.oFileName}`
        })
        aliUrls.push(obj)
      }
      hx.downloadZipImage({
        folderName: 'images',
        aliUrls,
        zipName: name
      })
    },
    handleChange () {
      let arr = []
      for (let k of this.formValidate.orgTypeId) {
        this.checkboxArr.map(item => {
          if (item.id === k) {
            arr = concat(arr, item.baseQualificationInfoList)
          }
        })
      }
      this.mandatoryArr = []
      this.menuArr = uniqBy(arr, 'id')
      let mArr = []
      for (let i in this.menuArr) {
        mArr.push(this.menuArr[i].id)
      }
      this.mandatoryArr = [...mArr]
      let index = this.mandatoryArr.findIndex(function (value, index, arr) {
        return value === '5'
      })
      if (index !== -1) {
        this.manage = true
      } else {
        this.manage = false
        this.formValidate.businessNum = ''
        this.formValidate.businessValidDate = ''
      }
      let licenseIndex = this.mandatoryArr.findIndex(function (value, index, arr) {
        return value === '4'
      })
      if (licenseIndex !== -1) {
        this.license = true
      } else {
        this.license = false
        this.formValidate.licenseNum = ''
        this.formValidate.licenseValidDate = ''
      }
    },
    back () {
      this.$router.go(-1)
    },
    getInfo () {
      this.appId = this.$route.params.id
      callApi('app/getAppDetailById', 'POST', {'appId': this.appId}, true)
        .then((res) => {
          let appDetail = res.content.appDetail
          this.formValidate.name = appDetail.orgName
          this.auditStatus = appDetail.auditStatus
          this.id = appDetail.id
          this.formValidate.orgTypeId = appDetail.orgTypeId ? appDetail.orgTypeId.split(',') : []
          this.formValidate.licenseNum = appDetail.licenseNum
          this.formValidate.licenseValidDate = appDetail.licenseValidDate ? new Date(appDetail.licenseValidDate) : ''
          this.formValidate.businessNum = appDetail.businessNum
          this.formValidate.businessValidDate = appDetail.businessValidDate ? new Date(appDetail.businessValidDate) : ''
          this.formValidate.addressCode =
            [
              parseInt(appDetail.provinceCode),
              parseInt(appDetail.cityCode),
              parseInt(appDetail.countyCode)
            ]
          this.formValidate.address = appDetail.address
          this.imgsObj = appDetail.declJson ? JSON.parse(appDetail.declJson) : {}
          let orgTypeList = res.content.orgTypeList
          this.checkboxArr = orgTypeList
          this.handleChange()
        })
    },
    saveAudit () {
      this.submitProductDeclare({
        url: 'app/cashAppOpenApply',
        content: {
          'cashInfo': {
            'id': this.id,
            'appId': this.appId,
            'licenseNum': this.formValidate.licenseNum,
            'licenseValidDate': this.formValidate.licenseValidDate.getTime(),
            'orgTypeId': this.formValidate.orgTypeId.join(','),
            'declJson': JSON.stringify(this.imgsObj),
            'provinceCode': this.formValidate.addressCode[0],
            'cityCode': this.formValidate.addressCode[1],
            'countyCode': this.formValidate.addressCode[2],
            'address': this.formValidate.address,
            'auditStatus': this.auditStatus
          }
        }
      }).then((res) => {
        if (res.success) {
          if (res.content.id) {
            this.appId = res.content.id
          }
        }
      }, (res) => {
      })
    },
    submitAudit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.submitProductDeclare({
            url: 'app/commitAppOpenApply',
            content: {
              'submitInfo': {
                'id': this.id,
                'appId': this.appId,
                'licenseNum': this.formValidate.licenseNum,
                'licenseValidDate': this.formValidate.licenseValidDate.getTime(),
                'orgTypeId': this.formValidate.orgTypeId.join(','),
                'declJson': JSON.stringify(this.imgsObj),
                'provinceCode': this.formValidate.addressCode[0],
                'cityCode': this.formValidate.addressCode[1],
                'countyCode': this.formValidate.addressCode[2],
                'address': this.formValidate.address,
                'auditStatus': this.auditStatus
              }
            }
          }).then((res) => {
            if (res.success) {
              this.$router.replace('/aptitudeToAudit')
            }
          })
        } else {
        }
      })
    },
    itemSelected (name) {
      this.indexNum = name
    },
    getImgs (dir, url, id, file) {
      if (!this.imgsObj[id]) {
        this.imgsObj[id] = {}
        this.imgsObj[id].fileList = []
      }
      let imgsInfo = this.imgsObj[id].fileList
      imgsInfo.push({
        'url': url,
        'dirName': dir,
        'oFileName': file.name,
        'size': file.size,
        'fileType': file.type
      })
      this.imgsObj = {
        ...this.imgsObj,
        [id]: {
          fileList: imgsInfo
        }
      }
    },
    reviewConfirm () {
      this.review = false
    },
    showBigImg (i, url) {
      this.review = true
      this.reviewUrl = `${this.ossUrl}/${url}`
    }
  }
}
</script>
<style src="./ProductDeclare.scss" lang="scss"></style>
