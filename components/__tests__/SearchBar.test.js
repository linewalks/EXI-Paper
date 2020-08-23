import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../SearchBar';

describe('SearchBar Component', () => {
  const requestSearch = jest.fn();
  const initKeyword = 'initKeyword'
  let component;
  let instance;
  beforeEach(() => {
    component = mount(<SearchBar getSearchList={requestSearch} initKeyword={initKeyword} />)
    instance = component.instance()
    jest.spyOn(instance.searchInput.current, 'blur')
  })

  it('when enter key is pressing, Api function called', () => {
    component.setState({ keyword: 6098 })
    component.find('input').simulate('keypress', { key: 'Enter' })
    expect(requestSearch).toHaveBeenCalled()
    expect(requestSearch).toHaveBeenCalledWith(6098)
    expect(instance.searchInput.current.blur).toHaveBeenCalledTimes(1)
  })

  it('when input keyword exists, x button exists', () => {
    component.find('input').simulate('change', { target: { value: '6098' } })
    expect(component.find('#search_close_btn')).toHaveLength(1)
  })

  it('when input keyword no exists, x button no exists', () => {
    component.find('input').simulate('focus')
    expect(component.find('#search_close_btn')).toHaveLength(0)
  })

  it('when input keyword exists and x button clicked, init keyword', () => {
    component.find('input').simulate('change', { target: { value: '6098' } })
    component.find('#search_close_btn').simulate('click')
    expect(component.state()).toEqual({ keyword: initKeyword })
    expect(requestSearch).toHaveBeenCalledWith(initKeyword)
    expect(requestSearch).toHaveBeenCalled()
    expect(instance.searchInput.current.blur).toHaveBeenCalledTimes(1)
  })
})
