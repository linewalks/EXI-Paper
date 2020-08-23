import React from 'react';
import { mount } from 'enzyme';
import * as nextRouter from 'next/router';
import SideBarUser from '@components/SideBarUser';

let component;
let expectedValue;
let expectedClassName;

describe('SideBarUser Component', () => {
  beforeEach(() => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ pathname: '/EditProfile' }));
    component = mount(<SideBarUser menuList={['Edit Profile', 'Change Password']} />)
  })

  it('menuList 개수 만큼 a 태그가 생겨야 한다.', () => {
    expectedValue = 2
    expect(component.find('a')).toHaveLength(expectedValue)
  })

  it('href와 router의 link가 일치하면 select class가 생겨야한다.', () => {
    expectedClassName = 'select'

    expect(component.find('a').at(0).prop('className')).toContain(expectedClassName)
    expect(component.find('a').at(1).prop('className')).not.toContain(expectedClassName)
  })
})
