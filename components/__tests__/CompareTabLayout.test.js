import React from 'react';
import { mount } from 'enzyme';
import CompareTabLayout from '@layouts/CompareTabLayout'

let component;

describe('CompareTabLayout Component', () => {
  beforeEach(() => {
    component = mount(
      <CompareTabLayout>
        <div>Hello</div>
      </CompareTabLayout>,
    )
  })

  it('layout 컴포넌트는 children을 받으면, children이 렌더링된다.', () => {
    const expectedChildren = `<div>Hello</div>`
    expect(component.html()).toContain(expectedChildren)
  })
})
