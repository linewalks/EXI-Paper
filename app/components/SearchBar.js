import React from 'react';
import styled from 'styled-components'
import { variables } from 'MDwalks-UI'
import fontStyle from 'MDwalks-UI/src/assets/styles/font.module.sass'
import PropTypes from 'prop-types';
import _ from 'lodash'

const { color } = variables

const SearchBarContainer = styled.div`
  margin-left: auto;
  position: relative;
  background:  url('/svg/icn_search_sm.svg') no-repeat 9px 9px;
  padding: 0 42px;
  width: 570px;
  height: 42px;
  border: 1px solid ${color.$line_search_grey};
  border-radius: 21px;
  transition: all .5s;

  &:focus-within {
    width: 570px;
    box-shadow: 0 2px 6px 0 rgba(0, 45, 79, 0.16);
  }
`

const SearchInput = styled.input.attrs({
  className: fontStyle.fs16,
  type: 'text',
  placeholder: 'Search',
})`
  width: 500px;
  height: 100%;

  &:focus {
    width: 500px;
  };

  ::placeholder {
    font-family: Spoqa Han Sans;
    color: rgba(0, 0, 0, 0.4);
  }
`

const ResetBtn = styled.button.attrs({
  type: 'reset',
  id: 'search_close_btn',
})`
  position: absolute;
  top: 9px;
  right: 9px;
`

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.initKeyword = props.initKeyword
    this.state = {
      keyword: this.initKeyword,
    }
    this.searchInput = React.createRef();
  }

  getKeyword = (event) => (
    this.setState({
      keyword: event.target.value,
    })
  )

  initInput = () => {
    const { getSearchList } = this.props
    this.searchInput.current.blur()
    this.setState({
      keyword: this.initKeyword,
    })
    getSearchList(this.initKeyword)
  }

  render() {
    const { keyword } = this.state
    const { getSearchList } = this.props
    return (
      <SearchBarContainer>
        <SearchInput
          value={keyword}
          onChange={this.getKeyword}
          onKeyPress={(event) => {
            if (keyword && event.key === 'Enter') {
              this.searchInput.current.blur()
              getSearchList(keyword)
            }
          }}
          ref={this.searchInput}
        />
        {!_.isEqual(keyword, this.initKeyword) ? (
          <ResetBtn onClick={this.initInput}>
            <img src="/svg/icn_search_close_default_sm.svg" width="24px" height="24px" alt="search close" />
          </ResetBtn>
        ) : null}
      </SearchBarContainer>
    )
  }
}

SearchBar.defaultProps = {
  initKeyword: '',
  getSearchList: () => {},
}

SearchBar.propTypes = {
  initKeyword: PropTypes.string,
  getSearchList: PropTypes.func,
};

export default SearchBar;
