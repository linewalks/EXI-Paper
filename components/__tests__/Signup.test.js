import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as nextRouter from 'next/router';
import Signup from '../../pages/signup/Signup';

const mockData = require('../../__mocks__/mockData')

const axiosMock = new MockAdapter(axios);

require('../../__mocks__/wrapAPI').wrapAPI(axiosMock)

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let component;

it('organization/list API 호출후, , organization list 데이터만큼 option이 생겨야 한다.', async () => {
  nextRouter.useRouter = jest.fn();
  nextRouter.useRouter.mockImplementation(() => ({ pathname: '/signup' }));
  const defaultOptionLength = 1
  const { organization } = mockData.organizationList
  const expected = defaultOptionLength + organization.length
  component = mount(<Signup />)

  expect(component.find(Signup).find('option').length).toEqual(defaultOptionLength)

  await act(async () => {
    await flushPromises()
    component.update()
  })

  expect(component.find(Signup).find('option').length).toEqual(expected)
})
