import React from 'react';
import { shallow } from 'enzyme';
import * as PlaceHolder from '../PlaceHolder';

describe('PlaceHolder Component', () => {
  let component;
  const expectedStyle = {
    marginTop: 10,
  }
  describe('PlaceHolder의 Table Component', () => {
    beforeEach(() => {
      component = shallow(<PlaceHolder.Table />)
    })

    it('PlaceHolder의 Table이 렌더링 되어야 한다.', () => {
      expect(component).toHaveLength(1)
    })

    it('PlaceHolder의 Table은 style props를 받을 수 있다.', () => {
      component.setProps({ style: { marginTop: 10 } })
      expect(component.prop('style')).toEqual(expectedStyle)
    })
  })

  describe('PlaceHolder의 SummaryCard Component', () => {
    beforeEach(() => {
      component = shallow(<PlaceHolder.SummaryCard />)
    })

    it('PlaceHolder의 SummaryCard가 렌더링 되어야 한다.', () => {
      expect(component).toHaveLength(1)
    })

    it('PlaceHolder의 SummaryCard는 style props를 받을 수 있다.', () => {
      component.setProps({ style: { marginTop: 10 } })
      expect(component.prop('style')).toMatchObject(expectedStyle)
    })
  })
})
