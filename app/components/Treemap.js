import React, { Component } from 'react';
import { SelectBox, Heading, variables } from 'MDwalks-UI'
import dataTreemapData from '@components/data/dataForTreemap';
import _ from 'lodash';

const { colorV1 } = variables

class Treemap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataTreemapData,
    };
  }

  componentDidMount() {
    const { threshold } = this.state
    this.renderTreemap(threshold);
  }

  render() {
    const { dataTreemapData} = this.state
    return (
      <div>
        
        {this.steps("Step 5. Exploring Model Interpretability Hierarchically")}
        <div style={{ display: 'flex', justifyContent: 'center' , marginTop: '25px' }}>
        <TreeMap
        data={[...dataTreemapData.parents, ...dataTreemapData.children]}
      />
        </div>
      </div>
    );
  }
}

export default Treemap;
