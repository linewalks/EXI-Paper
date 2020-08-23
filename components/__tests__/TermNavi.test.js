import React from 'react';
import { shallow, mount } from 'enzyme';
import TermNavi from '@components/TermNavi';
import NavLink from '@components/NavLink';
import * as nextRouter from 'next/router';

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

describe('TermNavi Component', () => {
  let component;
  let TermsOfUse;
  let PrivacyPolicy;
  let expectedProps;
  beforeEach(async () => {
    expectedProps = {
      TermsOfUseSrc: '/TermsOfUse',
      PrivacyPolicySrc: '/PrivacyPolicy',
    }

    component = shallow(<TermNavi />)
    TermsOfUse = component.find(NavLink).at(0)
    PrivacyPolicy = component.find(NavLink).at(1)

    await flushPromises();
  })

  it('TermsOfUse는 /TermsOfUse props를 가져야 한다.', () => {
    expect(TermsOfUse.prop('href')).toEqual(expectedProps.TermsOfUseSrc)
  })

  it('PrivacyPolicy는 /PrivacyPolicy props를 가져야 한다.', () => {
    expect(PrivacyPolicy.prop('href')).toEqual(expectedProps.PrivacyPolicySrc)
  })

  it('TermsOfUse가 선택되었을 때, class는 select를 가져야 한다.', async () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ pathname: '/TermsOfUse' }));
    component = mount(<TermNavi />)
    await flushPromises();
    const TermsOfUseClassName = component.find('li a').at(0).prop('className')
    const PrivacyPolicyClassName = component.find('li a').at(1).prop('className')

    expect(TermsOfUseClassName).toContain('select')
    expect(PrivacyPolicyClassName).not.toContain('select')
  })

  it('PrivacyPolicyClassName가 선택되었을 때, class는 select를 가져야 한다.', () => {
    nextRouter.useRouter = jest.fn();
    nextRouter.useRouter.mockImplementation(() => ({ pathname: '/PrivacyPolicy' }));
    component = mount(<TermNavi />)

    const TermsOfUseClassName = component.find('li a').at(0).prop('className')
    const PrivacyPolicyClassName = component.find('li a').at(1).prop('className')

    expect(TermsOfUseClassName).not.toContain('select')
    expect(PrivacyPolicyClassName).toContain('select')
  })
})
