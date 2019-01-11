import { mount } from 'vue-test-utils'
import ImageUploadItem from '../../../../src/components/ImageUploadItem'

const wrapper = mount(ImageUploadItem, {
  propsData: {
    imgItem: {
      name: 'hello'
    }
  }
})
describe('测试图片上传组件', () => {
  it('测试imgItem属性值', () => {
    expect(wrapper.vm.imgItem.name).to.equal('hello')
  })
  it('测试父容器类名', () => {
    expect(wrapper.classes()).to.include('imgWrapItem')
  })
})
