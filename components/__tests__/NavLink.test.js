import React from 'react';
import { mount } from 'enzyme';
import NavLink from '@components/NavLink';
import * as nextRouter from 'next/router';

describe('NavLink Component', () => {
  let component;
  let expectedClassName;

  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ pathname: '/go' }));
    component = mount(
      <NavLink className="A" href="/">
        go
      </NavLink>,
    )
  })

  it('a tag는 className을 props로 받을 수 있어야 한다.', () => {
    expectedClassName = 'A'
    expect(component.find('a').prop('className')).toContain(expectedClassName)
  })

  it('href와 router의 link가 일치하면 select class가 생겨야한다.', () => {
    expectedClassName = 'select'
    expect(component.find('a').prop('className')).not.toContain(expectedClassName)

    component.setProps({
      href: '/go',
    })
    expect(component.find('a').prop('className')).toContain(expectedClassName)
  })
})
