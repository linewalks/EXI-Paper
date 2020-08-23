import React from 'react';
import { mount } from 'enzyme';
import OldButton from '../Button';

describe('Button Component', () => {
  const onClick = jest.fn();
  const component = mount(<OldButton toggle={{ value: false }} onClick={onClick} />)
  const expected = {
    view: '/svg/icn_view_pw.svg',
    hide: '/svg/icn_hide_pw.svg',
  }

  it('toggle props의 value가 false이면 hide 이미지를 보여야 한다.', () => {
    expect(component.find('button > img').prop('src')).toEqual(expected.hide)
  })

  it('toggle props의 value가 true이면 view 이미지를 보여야 한다.', () => {
    component.setProps({ toggle: { value: true } })
    expect(component.find('button > img').prop('src')).toEqual(expected.view)
  })

  it('button click시, onClick function이 호출 되어야 한다.', () => {
    component.find('button').simulate('click')
    expect(onClick).toHaveBeenCalled()
  })
})
