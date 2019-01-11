<template>
  <div class="wrap">
    <div class="main">
      <Steps :stepsText="{current:'1',objsteps:[
      {text:'手机验证'},
      {text:'设置新密码'},
      {text:'完成'}]
      }"/>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="230">
        <div class="main_form" style="padding-top: 122px;">
          <FormItem prop="passwd"  label="输入新密码：">
            <Input type="password" v-model="formCustom.passwd" placeholder="" /><span>请输入新密码</span>
          </FormItem>
          <FormItem prop="passwdCheck"  label="确认新密码：">
            <Input type="password" v-model="formCustom.passwdCheck" placeholder="" /><span>请确保两次密码输入保持一致</span>
          </FormItem>
        </div>
        <FormItem style="margin-top:30px; text-align: center" :label-width="0.1">
          <Button type="primary"  @click="handleSubmit('formCustom')" size="large" style="width: 400px;">下一步</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import Steps from '../../components/NewPasswordSteps'

export default {
  name: 'NewPasswordSet',
  components: {
    Steps
  },
  data: function () {
    /*
 * 自定义密码验证
 * */
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码！'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证1
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码！'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次密码输入不一致请重新输入！'))
      } else {
        callback()
      }
    }
    return {
      current: 1,
      formCustom: {
        passwd: '',
        passwdCheck: ''
      },
      ruleCustom: {
        passwd: [
          {validator: validatePass, trigger: 'click'},
          {min: 6, message: '请输入最少6位'}
        ],
        passwdCheck: [
          {validator: validatePassCheck, trigger: 'click'},
          {min: 6, message: '请输入最少6位'}
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$router.push('/Newpasswordsuccess')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
<style lang="scss" src="./NewPassword.scss" type="text/css">
</style>
