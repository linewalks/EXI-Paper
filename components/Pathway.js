import React, { Component } from 'react';
import {
  SankeyChart,
  SelectedCard,
  Table,
  Pagination,
  Heading,
  variables,
  Button,
  SelectBox
} from 'MDwalks-UI'
import fontStyle from 'MDwalks-UI/src/assets/styles/font.module.sass'
import pathway from '@components/data/dataForSankey2'
import _ from 'lodash'
import styled from 'styled-components'
import tableDataP from '@components/data/dataForPatientList'

const { colorV1 } = variables



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
        headers: ['subject_id', 'hadm_id', "sequence"],
        rowData: newPatientList.slice((param.page - 1) * param.length, (param.page - 1) * param.length + param.length),
        totalRows: newPatientList.length
      },
    })
  }

  steps = (text) => {
    return (
      <header className="mt40 wrap_1200">
        <Heading size="25" style={{ color: colorV1.$grey10 }}>{text}</Heading>
      </header>
    )
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

  render() {
    const { sankeyData, selectedNodes, dataForTable, selectPage } = this.state
    return (
      <div>
        {this.steps("Step 2. Patient Labeling by Selecting Pathway in the Merged Patterns")}
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
          {
            dataForTable !== null
            && <Heading size="20" style={{ color: colorV1.$grey10 }}>
              {dataForTable.totalRows.toLocaleString() + " / " + 22495}</Heading>

          }
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
        {this.steps("Step 3. Training Model with Labeled Patients")}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
          <Button>Load preprocessed data</Button>
          <SelectBox>
            <select>
              <option value="0">LSTM layer size(s)</option>
              <option value="128">128</option>
              <option value="64">64</option>
            </select>
          </SelectBox>
          <SelectBox>
            <select>
              <option value="0">Number of Epochs</option>
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </SelectBox>
          <SelectBox>
            <select>
              <option value="0">Batch Size</option>
              <option value="128">128</option>
              <option value="256">256</option>
            </select>
          </SelectBox>
          <SelectBox>
            <select>
              <option value="0">Learning Rate</option>
              <option value="2">1e-2</option>
              <option value="3">1e-3</option>
            </select>
          </SelectBox>
          <Button variant="primary">Train Model</Button>
        </div>
      </div>
    )
  }
}


export default Pathway
