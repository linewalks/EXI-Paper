import React, { Component } from 'react';
import { Table, Pagination } from 'MDwalks-UI'
import SearchBar from '@components/SearchBar';
import fontStyle from 'MDwalks-UI/src/assets/styles/font.module.sass'
import _ from 'lodash'
import styled from 'styled-components'
import tableDataC1 from '@components/data/dataForCohortListPage1'
import tableDataC2 from '@components/data/dataForCohortListPage2'

const SearchBarBox = styled.article.attrs({
  className: fontStyle.fs14,
})`
  display: flex;
  align-items: center;

  dl, dt, dd {
    display: inline-block;
  }
`

class CohortList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataForTable: tableDataC1,
      selectPage: 1,
      keyword: 'CABG, Troponin-T, Troponin-I',
    }
  }

  componentDidMount = () => {

  }

  componentDidUpdate = (prevProps) => {
  }

  getSearchList = (keyword) => {
    const { event } = this.props
    const param = {
      event: _.upperFirst(event),
      page: 1,
      length: 10,
      keyword,
    }

    this.setState({
      keyword,
      selectPage: 1,
    }, () => this.getDataForTable(param))
  }

  getPageCnt() {
    const { dataForTable } = this.state
    if (!dataForTable) return 0
    let page = dataForTable.totalRows

    if (page % 10 === 0) {
      page = parseInt(page / 10, 10)
    } else {
      page = parseInt(page / 10, 10) + 1
    }

    return page
  }

  checkKeyword = (param) => {
    const { keyword } = this.state
    if (_.isEmpty(keyword)) return param
    return {
      ...param,
      keyword,
    }
  }

  getDataForTable = (param) => {
    // only two pages are provided
    if (param.page == 2){
      this.setState({
        dataForTable : tableDataC2,
      })
      
    }
    else {
      this.setState({
        dataForTable : tableDataC1,
      })
      
    }
  }


  changePage = (page = 1) => {
    const { sortingHeader, sortingOrder } = this.state
    const { event } = this.props
    this.setState({
      selectPage: page,
    })

    const defaultParam = { page, length: 10 }
    
    this.getDataForTable({ ...defaultParam})
  }

  getTableId = (text) => text.replace(/\s+/, '')[0].toLowerCase() + text.replace(/\s+/, '').slice(1)

  render() {
    const { dataForTable, selectPage, keyword } = this.state
    console.log
    return (
      <div className="wrap_1200">
        <p className={`${fontStyle.fs14} ${fontStyle.fc_grey08}`}>Cohort List</p>

        <div className="mt32">
          <SearchBarBox>
            <dl>
              <dt className={fontStyle.fc_grey08}>Cohort</dt>
              <dd className={`ml14 ${fontStyle.fc_grey09}`}>
                {
                  dataForTable !== null
                  && <span>{dataForTable.totalRows.toLocaleString()}</span>
                }
              </dd>
            </dl>
            <SearchBar
              getSearchList={this.getSearchList}
              initKeyword={keyword}
            />
          </SearchBarBox>
        </div>
        <div className="mt16">       
          {
            
              dataForTable !== null
              && (
              <Table
                loading={_.isEmpty(dataForTable.rowData)}               
                data={dataForTable}
                columns={[508, 136]}
              />
              )
          } 
          {
            dataForTable !== null
            && (
            <div className="mt32 text-center">
              <Pagination
                selectPage={selectPage}
                drawPageCnt={5}
                onChange={this.changePage}
                totalPage={this.getPageCnt()}
              />
            </div>
            )
          }

        </div>
      </div>
    );
  }
}

export default CohortList;
