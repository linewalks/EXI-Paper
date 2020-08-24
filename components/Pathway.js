import React, { Component } from 'react';
import {
  SankeyChart
} from 'MDwalks-UI'

import pathway from '@components/data/dataForSankey2'
import _ from 'lodash'
import PatientList from '@components/PatientList'


class Pathway extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sankeyData: pathway,
      selectedNodes: [],
    }
  }
  render() {
    const { sankeyData, selectedNodes } = this.state
    return (
      <div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>

        {
          !_.isNull(sankeyData) && (
            <SankeyChart
              onChange={(nodes) => {
                console.log('nodes', nodes)
                this.setState({
                    selectedNodes: nodes
                })
              }}
              data={sankeyData}
              selectedNodes={selectedNodes}
            />
          )
        }
        
      </div>
      <PatientList keyword={selectedNodes} />
      </div>
    )
  }
}


export default Pathway
