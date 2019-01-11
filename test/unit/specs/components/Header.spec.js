import { mount } from 'vue-test-utils'
import Header from '../../../../src/components/Header'

const wrapper = mount(Header)

describe('Header 组件渲染', () => {
  it('Header组件的根元素的类名为header', () => {
    expect(wrapper.classes()).to.include('header')
  })
})
