import React, { Component } from 'react';
import { Table, Pagination } from 'MDwalks-UI'
import fontStyle from 'MDwalks-UI/src/assets/styles/font.module.sass'
import _ from 'lodash'
import tableDataP from '@components/data/dataForPatientList'



class PatientList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataForTable: null,
      selectPage: 1,
      keyword: this.props.keyword
    }
  }

  componentDidMount = () => {
    this.getSearchList()
  }

  componentDidUpdate = (prevProps) => {
  }

  getSearchList = () => {
    const { keyword } = this.props
    const param = {
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

  getDataForTable = (param) => {
    if (param.keyword.length > 0) {
      const regex = new RegExp(param.keyword.join("(.*)"), 'i');
      const newPatientList = tableDataP.rowData.filter(({ sequence }) => sequence.match(regex))

      this.setState({
        dataForTable: {
          header: ['subject_id', 'hadm_id', "sequence"],
          rowData: newPatientList.slice((param.page - 1) * param.length, (param.page - 1) * param.length + param.length),
          totalRows: newPatientList.length
        },
      })

    }
    else {
      this.setState({
        dataForTable: null,
      })
    }

  }

  changePage = (page = 1) => {
    const { keyword } = this.props
    const param = {
      page: page,
      length: 10,
      keyword,
    }

    this.setState({
      keyword,
      selectPage: page,
    }, () => this.getDataForTable(param))
  }

  getTableId = (text) => text.replace(/\s+/, '')[0].toLowerCase() + text.replace(/\s+/, '').slice(1)

  render() {
    const { dataForTable, selectPage, keyword } = this.state
    
    return (
      <div className="wrap_1200">
        <p className={`${fontStyle.fs14} ${fontStyle.fc_grey08}`}>Patient List</p>
        <dl>
          <dt className={fontStyle.fc_grey08}>Cohort</dt>
          <dd className={`ml14 ${fontStyle.fc_grey09}`}>
            {
              dataForTable !== null
              && <span>{dataForTable.totalRows.toLocaleString()}</span>
            }
          </dd>
        </dl>
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
    );
  }
}

export default PatientList;
