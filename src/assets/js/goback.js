/**
 * @file 内容验证
 * @author mhc（423822728@qq.com）
 */

const gb = {

  set_orgStutas(){
    let uid = sessionStorage.getItem('uuid')
    if(uid!=null){
      this.$store.state.org_status = this.$store.state.app
    }
  }

}

export default gb
