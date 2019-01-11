import { mount } from 'vue-test-utils'
import Subtitle from '../../../../src/components/Subtitle'
const wrapper = mount(Subtitle)
describe('页面副标题', function () {
  // 挂在组件
  it('渲染subtitle的属性值', () => {
    wrapper.setProps({
      subtitle: '这个是个副标题'
    })
    expect(wrapper.vm.subtitle).to.equal('这个是个副标题')
  })
})
