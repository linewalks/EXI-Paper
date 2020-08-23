import React from 'react';
import { mount } from 'enzyme';
import LogoVertical from '@components/LogoVertical';
import Link from 'next/link'

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('LogoVertical Component', () => {
  let component;
  const expected = {
    src: '/',
    defaultImg: {
      width: '173px',
      height: '48px',
      src: '/img/linewalks-logo-vertical-small.png',
    },
    bigImg: {
      width: '237px',
      height: '63px',
      src: '/img/linewalks-logo-vertical-big.png',
    },
  }
  describe('LogoVertical Component for Default Img size', () => {
    beforeEach(async () => {
      component = mount(<LogoVertical />)
      await flushPromises();
    })

    it('LogoVertical은 / props를 가져야 한다.', () => {
      expect(component.find(Link).prop('href')).toEqual(expected.src)
    })

    it('size props가 없으면, LogoVertical은 기본 이미지 사이즈를 가진다.', () => {
      expect(component.find('img').prop('width')).toEqual(expected.defaultImg.width)
      expect(component.find('img').prop('height')).toEqual(expected.defaultImg.height)
    })

    it('size props가 없으면, LogoVertical은 기본 이미지 주소를 가진다.', () => {
      expect(component.find('img').prop('src')).toEqual(expected.defaultImg.src)
    })
  })

  describe('LogoVertical Component For Big Image Size', () => {
    beforeEach(() => {
      component = mount(<LogoVertical size="big" />)
    })

    it('size props가 big이면, LogoVertical은 big 이미지 사이즈를 가진다.', () => {
      expect(component.find('img').prop('width')).toEqual(expected.bigImg.width)
      expect(component.find('img').prop('height')).toEqual(expected.bigImg.height)
    })

    it('size props가 big이면, LogoVertical은 big 이미지 주소를 가진다.', () => {
      expect(component.find('img').prop('src')).toEqual(expected.bigImg.src)
    })
  })
})
