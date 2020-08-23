import React from 'react';
import { mount } from 'enzyme';
import CardPlaceHolder from '@components/CardPlaceHolder';

describe('CardPlaceHolder Component', () => {
  const component = mount(<CardPlaceHolder />)

  it('마운트시 렌더링 되어야 한다.', () => {
    expect(component).toHaveLength(1)
  })
})
