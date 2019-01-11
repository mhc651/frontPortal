// 通过模版
<template>
<section class="main--fluid">
  <div class="container--center" id="page"></div>
</section>
</template>
<script>
export default {
  data() {
    return { content: '' }
  },
  computed: {
    id() {
      let id = this.$route.params.id
      return id
    },
  },
  watch:{
    id(val){
      this.setContent(val)
    }
  },
  mounted() {
    this.setContent(this.id)
  },
  methods: {
    /**
     * 获得数据
     * @param {String} code 数据编辑号
     */
    setContent(code) {
      let page = require(`./data/${code}.js`)
      this.$el.querySelector('#page').innerHTML = page.default
    }
  }
}
</script>
<style lang="scss" src='./page.scss'></style>
