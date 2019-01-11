/**
 * @file 内容验证
 * @author mhc（423822728@qq.com）
 */

const uuids = {

  S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  },
  guid() {
    return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4());
  },
  reuuid(){
    return this.guid()
  }
}

export default uuids
