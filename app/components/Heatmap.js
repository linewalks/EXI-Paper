import React, { Component } from 'react';
import { SelectBox, Heading, variables } from 'MDwalks-UI'
import grpHeatmapData from '@components/data/dataForHeatmap';
import p9 from '@components/data/dataForHeatmap9';
import p13 from '@components/data/dataForHeatmap13';
import metadata from '@components/data/dataForMetadata';
import * as core from 'd3';
import _ from 'lodash';

const { colorV1 } = variables

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: 0.0,
      data: grpHeatmapData,
    };
    this.d3 = { ...core };
  }

  componentDidMount() {
    const { threshold } = this.state
    this.renderHeatmap(threshold);
  }

  renderHeatmap = (threshold) => {
    const { d3 } = this;
    // set the dimensions and margins of the graph
    const margin = {
      top: 90, right: 25, bottom: 30, left: 400,
    };
    const width = 900 - margin.left - margin.right;
    const height = 1200 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select('#heatmapWrap')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Read the data
    const { data } = this.state;
    console.log(data[10])
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    const myGroups = d3
      .map(data, (d) => d.group)
      .keys();
    const myVars = d3
      .map(data, (d) => metadata[d.variable])
      .keys();

    // Build X scales and axis:
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(myGroups)
      .padding(0.15);
    svg
      .append('g')
      .style('font-size', 15)
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select('.domain')
      .remove();
    svg
      .append('g')
      .style('font-size', 15)
      .attr('transform', `translate(0,${0})`)
      .call(d3.axisTop(x).tickSize(0))
      .select('.domain')
      .remove();

    // Build Y scales and axis:
    const y = d3
      .scaleBand()
      .range([height, 0])
      .domain(myVars)
      .padding(0.15);
    svg
      .append('g')
      .style('font-size', 15)
      .call(d3.axisLeft(y).tickSize(0))
      .select('.domain')
      .remove();

    // Build color scale
    const myColor = d3
      .scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1, 100]);

    // create a tooltip
    const tooltip = d3
      .select('#heatmapWrap')
      .append('div')
      .style('opacity', 0)
      .style('position', 'absolute')
      .attr('class', 'tooltip')
      .style('background-color', 'white')
      .style('border', 'solid')
      .style('border-width', '2px')
      .style('border-radius', '5px')
      .style('padding', '5px');

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (d) {
      tooltip
        .style('opacity', 1)
        .text(`Weight: ${d.value}`)
        .style('left', `${x(d.group) + 450}px`)
        .style('top', `${y(metadata[d.variable]) + 80}px`);
      d3.select(this)
        .style('stroke', 'black')
        .style('opacity', 1);
    };

    const mouseleave = function () {
      tooltip.style('opacity', 0);
      d3.select(this)
        .style('stroke', 'none')
        .style('opacity', 0.8);
    };

    // add the squares
    svg
      .selectAll()
      .data(data, (d) => `${d.group}:${d.variable}`)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.group))
      .attr('y', (d) => y(metadata[d.variable]))
      .attr('rx', 4)
      .attr('ry', 4)
      // .attr("width", 60)
      // .attr("height", 40)

      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', (d) => {
        if (d.value >= threshold) return myColor(d.value * 100);
        return null
      })
      .style('stroke-width', 4)
      .style('stroke', 'none')
      .style('opacity', 0.8)
      .on('mouseover', mouseover)
      .on('mouseleave', mouseleave);

    // Add title to graph
    // svg
    //   .append('text')
    //   .attr('x', 0)
    //   .attr('y', -40)
    //   .attr('text-anchor', 'left')
    //   .style('font-size', '22px')
    //   .text('Attention heatmap');
  }

  removeHeatmap() {
    const { d3 } = this;
    d3
      .select('#heatmapWrap')
      .select('svg')
      .remove();
  }

  changeThreshold(event) {
    this.removeHeatmap();
    this.renderHeatmap(event.target.value);
  }

  changeHeatmap(event) {
    this.removeHeatmap();
    console.log(event.target.value, "patient selected");
    var p = grpHeatmapData
    if (event.target.value === 0)
      p = grpHeatmapData
    else if (event.target.value == 9)
      p = p9
    else if (event.target.value == 13)
      p = p13
    this.setState({
      data: p
    });

    this.renderHeatmap(0.0);
  }

  steps= (text) => {
    return (
      <header className="mt40 wrap_1200">
          <Heading size="25" style={{ color: colorV1.$grey10 }}>{text}</Heading>
      </header>
    )
  }

  render() {
    return (
      <div>
        {this.steps("Step 4. Exploring Model Interpretability")}
        <div style={{ display: 'flex', justifyContent: 'center' , marginTop: '25px' }}>
          <SelectBox>
            <select onChange={this.changeHeatmap.bind(this)}>
              <option value={0}>All Patients</option>
              <option value={9}>9</option>
              <option value={13}>13</option>
            </select>
          </SelectBox>

          <SelectBox>
            <select
              onChange={this.changeThreshold.bind(this)}
            >
              <option value={0}>Threshold</option>
              {_.range(0, 1 + 0.2, 0.2).map((value) => (
                <option key={value.toFixed(2)} value={value}>
                  {value.toFixed(2)}
                </option>
              ))}
            </select>
          </SelectBox>
        </div>
        <div
          style={
            {
              display: 'flex',
              justifyContent: 'center',
              width: '1500px',
              height: '1200px',
            }}
        >
          <div id="heatmapWrap" />
        </div>
      </div>
    );
  }
}

export default Heatmap;
