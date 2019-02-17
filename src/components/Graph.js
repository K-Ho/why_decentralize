import React, { Component } from 'react';
import * as d3 from 'd3';

var width = '100%';
var height = '100%';

var zoom = d3.zoom();

// *****************************************************
// ** d3 functions to manipulate attributes
// *****************************************************

// **** Node Functions  ****

let nodes
var enterNode = (selection) => {
  selection.classed('node', true)
    .append('circle')
    .attr("r", d=>{
      if (d.constructor.name === 'Paypal') return 20
      return 10
    })
    .attr("cx", d=> d.x)
    .attr("cy", d=> d.y)
};

var updateNode = (selection) => {
  selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
    .attr('fill', (d) => {
      // return d3.color(d.color)
      //   .brighter(0.5)
      return d.color
    })
    .attr('stroke', (d) => d.color)
    .attr('stroke-width', (d) => 5)
};

// **** Link Functions  ****

var enterLink = (selection) => {
  selection.classed('link', true)
    .attr("stroke-width", 2)
    .attr("stroke", 'grey')
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
};

var updateLink = (selection) => {

};

// **** Message Functions  ****
var enterMessage = (selection) => {
  selection.classed('message', true)
    .attr("r", 6)
    .attr("fill", d => '#' + d.message.sig.slice(2,8))
    .attr("fill-opacity", 0.5)
    .attr('stroke-width', (d) => 3)
    .attr('stroke', (d) => '#' + d.message.sig.slice(2,8))
    .attr("cx", d=> getNodeById(d.sender).x)
    .attr("cy", d=> getNodeById(d.sender).y)
}

var getNodeById = (id) => {
  return nodes.find(
    (node) => node.pid === id
  )
}

const getMsgPos = (msg, coord) => {
  const distance = msg.time - msg.sentTime
  const length = msg.recvTime - msg.sentTime
  const progress = distance/length
  const recCoord = getNodeById(msg.recipient)[coord]
  console.log(recCoord)
  const sentCoord = getNodeById(msg.sender)[coord]
  console.log(sentCoord)
  return progress * (recCoord - sentCoord) + sentCoord
}

var updateMessage = (selection) => {
  selection
  .transition()
  .duration(300)
  .ease(d3.easeLinear)
  .attr("cx", d => getMsgPos(d,'x'))
  .attr("cy", d => getMsgPos(d, 'y'))
}

// *****************************************************
// ** Graph component
// *****************************************************

class Graph extends Component {
    componentDidMount() {
      this.d3Graph = d3.select(this.viz);
    }

    shouldComponentUpdate(nextProps) {
      nodes = nextProps.nodes
      const {onClick} = this.props
      this.d3Graph = d3.select(this.viz);
      const d3Nodes = this.d3Graph.selectAll('.node')
        .data(nextProps.nodes, (node) => node.pid);
      d3Nodes.enter().append('g').call(enterNode)
      // .on('click', function(d){
      //   onClick(d, d3.event.pageX, d3.event.pageY)
      // })
      d3Nodes.exit().remove();

      const d3Links = this.d3Graph.selectAll('.link')
        .data(nextProps.links)

      d3Links.enter().insert('line', '.node').call(enterLink);
      d3Links.exit().remove();
      d3Links.call(updateLink);
      const d3Messages = this.d3Graph.selectAll('.message')
        .data(nextProps.messages, message => {
          return message.message.sig + ':' +
          message.recipient + ':' +
          message.sender
        });
      const msgEnter = d3Messages.enter().insert('circle', '.node').call(enterMessage);
      d3Messages.exit().remove();
      d3Messages.merge(msgEnter).call(updateMessage);

      // we should actually clone the nodes and links
      // since we're not supposed to directly mutate
      // props passed in from parent, and d3's force function
      // mutates the nodes and links array directly
      // we're bypassing that here for sake of brevity in example
      return false;
    }

    render() {
      return (
        <svg width={width} height={height}>
          <g ref={el => this.viz = el} />
        </svg>
      );
    }
}

export default Graph;
