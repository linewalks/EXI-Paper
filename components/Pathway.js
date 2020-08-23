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
    const { subjectId } = this.props
    this.state = {
      sankeyData: pathway,
      selectedNodes: ['ischemic_hd', 'Chemistry Troponin T', 'ECG', 'CABG'],
    }
  }
  render() {
    const { sankeyData, selectedNodes } = this.state
    return (
        <div>
      
      
    
        {
          !_.isNull(sankeyData) && (
            <SankeyChart
              data={sankeyData}
              selectedNodes={selectedNodes}
            />
          )
        }
        <PatientList keyword={selectedNodes}/>
    </div>
    )
  }
}


export default Pathway
