import React from 'react';
import { mount } from 'enzyme';
import UserLogo from '@components/UserLogo';
import { Image } from 'MDwalks-UI'

let component;

const expectedLogoSize = {
  sm: {
    width: 34,
    height: 34,
  },

  md: {
    width: 114,
    height: 114,
  },

  lg: {
    width: 150,
    height: 150,
  },
}

describe('UserLogo Component', () => {
  beforeEach(() => {
    component = mount(<UserLogo src="/test" />)
  })

  it('size props에 따라 다른 size를 렌더링 해야 된다.', () => {
    ['sm', 'md', 'lg'].forEach((size) => {
      component.setProps({
        size,
      })

      expect(component.find(Image).prop('logo').width).toEqual(expectedLogoSize[size].width)
      expect(component.find(Image).prop('logo').height).toEqual(expectedLogoSize[size].height)
    })
  })
})
