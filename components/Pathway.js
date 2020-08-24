import React, { Component } from 'react';
import {
  SankeyChart,
  SelectedCard,
  Table,
  Pagination
} from 'MDwalks-UI'
import fontStyle from 'MDwalks-UI/src/assets/styles/font.module.sass'
import pathway from '@components/data/dataForSankey2'
import _ from 'lodash'
import styled from 'styled-components'
import tableDataP from '@components/data/dataForPatientList'

const SearchBarBox = styled.article.attrs({
  className: fontStyle.fs14,
})`
  display: flex;
  align-items: center;

  dl, dt, dd {
    display: inline-block;
  }
`

class Pathway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sankeyData: pathway,
      selectedNodes: [],
      dataForTable: null,
      selectPage: 1,
    }
  }

  componentDidMount = () => {
    this.getSearchList()
  }

  getSearchList = () => {
    console.log("searchlist")
    const selectedNodes = []
    const param = {
      page: 1,
      length: 10,
      selectedNodes,
    }

    this.setState({
      selectPage: 1,
      selectedNodes,
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

  getDataForTable = (param) => {
    const regex = new RegExp(param.selectedNodes.join("(.*)") + "(.*)", 'i');
    console.log(param, regex)

    const newPatientList = tableDataP.rowData.filter(({ sequence }) => sequence.match(regex))

    this.setState({
      dataForTable: {
        header: ['subject_id', 'hadm_id', "sequence"],
        rowData: newPatientList.slice((param.page - 1) * param.length, (param.page - 1) * param.length + param.length),
        totalRows: newPatientList.length
      },
    })
  }

  changePage = (page = 1) => {
    const selectedNodes = this.state.selectedNodes
    const param = {
      page: page,
      length: 10,
      selectedNodes,
    }

    this.setState({
      selectedNodes,
      selectPage: page,
    }, () => this.getDataForTable(param))
  }

  getTableId = (text) => text.replace(/\s+/, '')[0].toLowerCase() + text.replace(/\s+/, '').slice(1)

  render() {
    const { sankeyData, selectedNodes, dataForTable, selectPage } = this.state
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          {
            !_.isNull(sankeyData) && (
              <SankeyChart
                onChange={(selectedNodes) => {
                  const param = {
                    selectedNodes,
                    page: 1,
                    length: 10
                  }
                  this.setState({
                    selectPage: 1,
                    selectedNodes: selectedNodes
                  }, () => this.getDataForTable(param))
                }}
                data={sankeyData}
                selectedNodes={selectedNodes}
              />
            )
          }

        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SelectedCard selectedElement={selectedNodes} isLastHighlighted={true} />
        </div>
        <div className="wrap_1200">
          <p className={`${fontStyle.fs14} ${fontStyle.fc_grey08}`}>Patient List</p>
          <SearchBarBox>
            <dl>
              <dt className={fontStyle.fc_grey08}>Patient</dt>
              <dd className={`ml14 ${fontStyle.fc_grey09}`}>
                {
                  dataForTable !== null
                && <span>{dataForTable.totalRows.toLocaleString()} / {tableDataP.totalRows.toLocaleString()}</span>
                }
              </dd>
            </dl>
          </SearchBarBox>
          <div className="mt16">
            {

              dataForTable !== null
              && (
                <Table
                  loading={_.isEmpty(dataForTable.rowData)}
                  data={dataForTable}
                  columns={[25, 25, 600]}
                />
              )
            }
            {
              dataForTable !== null
              && (
                <div className="mt32 text-center">
                  <Pagination
                    selectPage={selectPage}
                    drawPageCnt={10}
                    onChange={this.changePage}
                    totalPage={this.getPageCnt()}
                  />
                </div>
              )
            }

          </div>
        </div>
      </div>
    )
  }
}


export default Pathway
