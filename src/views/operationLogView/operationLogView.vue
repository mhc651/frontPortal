<template>
  <div class="register viewAuditMaterials">
    <div class="registerWrap" >
      <MainTitle :mainTitle="'操作日志查看'" style="margin-top: 30px;"/>
      <div class="status">
        <div class="ltPortion"><span>审核结果：</span><span class="statusVal">未通过</span></div>
        <div class="rtPortion"><span>审核意见：</span><span class="statusVal">未通过未通过未通过未通过未通过未通过未通过</span></div>
      </div>
      <Subtitle :subtitle="'企业信息'" style="margin-top: 30px;" />
      <div class="registerInfo">
        <inputItem
          :labelVal="{label:'机构全称'}"
        />
        <inputItem :labelVal="{label:'法人姓名'}" />
        <inputItem :labelVal="{label:'法人身份证号码'}" />
        <inputItem :labelVal="{label:'统一社会信用代码/营业执照代码'}" />
        <inputItem :labelVal="{label:'执业许可证代码'}" />
        <div class="imgUpload">
          <label class="leftName" style="width: 225px;"><span>*</span>授权文件：</label>
          <div class="imgWrap">
            <ImgUploadItem :imgItem="{name:'上传营业执照'}" />
            <ImgUploadItem :imgItem="{name:'上传组织机构代码'}" />
            <ImgUploadItem :imgItem="{name:'上传税务登记证'}" />
            <ImgUploadItem :imgItem="{name:'上传执业许可证'}" />
            <ImgUploadItem :imgItem="{name:'上传法人身份证正面'}" />
            <ImgUploadItem :imgItem="{name:'上传法人身份证反面'}" />
            <ImgUploadItem :imgItem="{name:'上传企业授权函'}" />
          </div>
        </div>
      </div>
      <Subtitle :subtitle="'授权信息'" />
      <div class="registerInfo">
        <inputItem :labelVal="{label:'被授权人姓名'}" />
        <inputItem :labelVal="{label:'身份证号码'}" />
        <inputItem :labelVal="{label:'手机号号码'}" />
      </div>
      <div class="line"></div>
      <Button type="primary" class="registerBtn" >返回</Button>
    </div>
  </div>
</template>
<script>
import inputItem from '../../components/inputItem'
import ImgUploadItem from '../../components/ImageUploadItem'
import MainTitle from '../../components/MaintItle'
import Subtitle from '../../components/Subtitle'
export default {
  name: 'OperationLogView',
  components: {
    inputItem,
    ImgUploadItem,
    MainTitle,
    Subtitle
  },
  data () {
    return {
    }
  },
  methods: {
    handleKeyUp (msg) {
      return false
    },
    handleBlur (msg) {
      return false
    }
  }
}
</script>
<style src="../Register/Register.scss" lang="scss"></style>
<style src="../ViewAuditMaterials/ViewAuditMaterials.scss" lang="scss"></style>
