<template>
  <div class="register viewAuditMaterials">
    <div class="registerWrap" >
      <MainTitle :mainTitle="'查看审核材料'" style="margin-top: 30px;"/>
      <div class="status">
        <div class="ltPortion"><span>审核结果：</span><span class="statusVal">{{auditStatus}}</span></div>
        <div class="rtPortion"><span>审核意见：</span><span class="statusVal">{{auditReason}}</span></div>
      </div>
      <Subtitle :subtitle="'企业信息'" style="margin-top: 30px;" />
      <div class="registerInfo">
        <inputItem
          :labelVal="{label:'企业名称'}"
          :value ="orgName"
          @handleKeyUp="handleKeyUp"
          @handleBlur="handleBlur"
        />
        <inputItem
          :labelVal="{label:'法人姓名'}"
          :value="legalName ? legalName : ''"
        />
        <inputItem
          :labelVal="{label:'法人身份证号码'}"
          :value="legalCardNo ? legalCardNo : ''"
        />
        <inputItem
          :labelVal="{label:'统一社会信用代码/营业执照代码'}"
          :value="credit ? credit : ''"
        />
        <inputItem
          :labelVal="{label:'执业许可证代码'}"
          :value="licence ? licence : ''"
          v-if="false"
        />
        <div class="imgUpload">
          <label class="leftName" style="width: 225px"><span>*</span>授权文件：</label>
          <div class="imgWrap">
            <div class="imgItem" v-if="authFile[0]">
              <div class="shadow">
                <div></div>
                <Icon type="eye" @click.native="bigImg(authFile[0].src)"></Icon>
              </div>
              <img :src="authFile[0] ? `${ossUrl}/${authFile[0].src}` : ''" />
              <p>营业执照</p>
            </div>
            <div class="imgItem" v-if="authFile[1]">
              <div class="shadow">
                <div></div>
                <Icon type="eye" @click.native="bigImg(authFile[1].src)"></Icon>
              </div>
              <img :src="authFile[1] ? `${ossUrl}/${authFile[1].src}` : ''" />
              <p>组织机构代码</p>
            </div>
            <div class="imgItem" v-if="authFile[2]">
              <div class="shadow">
                <div></div>
                <Icon type="eye" @click.native="bigImg(authFile[2].src)"></Icon>
              </div>
              <img :src="authFile[2] ? `${ossUrl}/${authFile[2].src}` : ''" />
              <p>税务登记证</p>
            </div>
            <div class="imgItem" v-if="false">
              <div class="shadow">
                <div></div>
                <Icon type="eye" @click.native="bigImg(authFile[3].src)"></Icon>
              </div>
              <img :src="authFile[3] ? `${ossUrl}/${authFile[3].src}` : ''" />
              <p>执业许可证</p>
            </div>
            <div class="imgItem" v-if="authFile[4]">
              <div class="shadow">
                <div></div>
                <Icon type="eye" @click.native="bigImg(authFile[4].src)"></Icon>
              </div>
              <img :src="authFile[4] ? `${ossUrl}/${authFile[4].src}` : ''" />
              <p>法人身份证正面</p>
            </div>
            <div class="imgItem" v-if="authFile[5]">
              <div class="shadow">
                <div></div>
                <Icon type="eye" @click.native="bigImg(authFile[5].src)"></Icon>
              </div>
              <img :src="authFile[5] ? `${ossUrl}/${authFile[5].src}` : ''" />
              <p>法人身份证反面</p>
            </div>
            <div class="imgItem" v-if="authFile[6]">
              <div class="shadow">
                <div></div>
                <Icon type="eye" @click.native="bigImg(authFile[6].src)"></Icon>
              </div>
              <img :src="authFile[6] ? `${ossUrl}/${authFile[6].src}` : ''" />
              <p>企业授权函</p>
            </div>
          </div>
        </div>
      </div>
      <Subtitle :subtitle="'授权信息'" />
      <div class="registerInfo ? registerInfo : ''">
        <inputItem
          :labelVal="{label:'被授权人姓名'}"
          :value="realName ? realName : ''"
        />
        <inputItem
          :labelVal="{label:'身份证号码'}"
          :value="cardNo ? cardNo : ''"
        />
        <inputItem
          :labelVal="{label:'手机号号码'}"
          :value="phone ? phone : ''"
        />
      </div>
      <div v-show="false">
        <Subtitle :subtitle="'操作日志'" />
        <Table border class="logTable" :columns="columns" :data="data6"></Table>
        <Page class-name="tablePage" :total="40" size="small" show-total show-elevator show-sizer placement="top"></Page>
      </div>
      <div class="line"></div>
      <Button type="primary" class="registerBtn" @click="back" style="margin-top: 30px">返回</Button>
    </div>
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
  </div>
</template>
<script>
/*
  * cesahi
  * */
import inputItem from '../../components/inputItem'
import ImgUploadItem from '../../components/ImageUploadItem'
import MainTitle from '../../components/MaintItle'
import Subtitle from '../../components/Subtitle'
import callApi from '../../utils/callApi'

export default {
  name: 'ViewAuditMaterials',
  components: {
    inputItem,
    ImgUploadItem,
    MainTitle,
    Subtitle
  },
  data () {
    return {
      reviewUrl: '', // 保存预览图片
      review: false,
      disabledBtn: false,
      time: 120,
      timer: null,
      columns: [
        {
          title: '序号',
          key: 'name',
          width: 152,
          align: 'center'
        },
        {
          title: '企业名称',
          key: 'age',
          width: 272,
          align: 'center'
        },
        {
          title: '操作人',
          key: 'address',
          width: 150,
          align: 'center'
        },
        {
          title: '操作时间',
          key: 'address',
          width: 176,
          align: 'center'
        },
        {
          title: '操作类型',
          key: 'address',
          width: 176,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px',
                  color: '#1686EA',
                  fontSize: '14px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看')
            ])
          }
        }
      ],
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ],
      ossUrl: '',
      orgName: '',
      legalName: '',
      legalCardNo: '',
      credit: '',
      licence: '',
      authFile: {},
      realName: '',
      cardNo: '',
      phone: '',
      auditStatus: '',
      auditReason: ''
    }
  },
  mounted () {
    callApi('org/orgDetail', 'POST', {}, true)
      .then((res) => {
        if (res.success) {
          let vals = res.content.orgInfoDo
          this.ossUrl = res.content.ossUrlPrefix
          this.authFile = JSON.parse(vals.authFile)
          this.orgName = vals.orgName
          this.legalName = vals.legalName
          this.legalCardNo = vals.legalCardNo
          this.credit = vals.credit
          this.licence = vals.licence
          this.realName = res.content.orgUserInfo.realName
          this.cardNo = res.content.orgUserInfo.cardNo
          this.phone = res.content.orgUserInfo.phone
          this.auditStatus = vals.auditStatus === '01' ? '未提交' : vals.auditStatus === '02' ? '待审核' : vals.auditStatus === '03' ? '审核中' : vals.auditStatus === '20' ? '审核通过' : '审核不通过'
          this.auditReason = vals.auditReason
        }
      })
  },
  methods: {
    reviewConfirm () {
      this.review = false
    },
    bigImg (url) {
      this.review = true
      this.reviewUrl = `${this.ossUrl}/${url}`
    },
    back () {
      this.$router.go(-1)
    },
    handleKeyUp (msg) {
      return false
    },
    handleBlur (msg) {
      return false
    },
    getNumCode () {
      this.disabledBtn = true
      this.timer = null
      this.timer = setInterval(function () {
        this.time--
        if (this.time === 0) {
          this.disabledBtn = false
          this.time = 120
          clearInterval(this.timer)
        }
      }.bind(this), 1000)
    },
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      })
    }
  }
}
</script>
<style src="../Register/Register.scss" lang="scss"></style>
<style src="./ViewAuditMaterials.scss" lang="scss"></style>
