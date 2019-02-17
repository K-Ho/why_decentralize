import React, { Component } from 'react';
import * as d3 from 'd3';

var width = '400px';
var height = '300px';

var zoom = d3.zoom();

// *****************************************************
// ** d3 functions to manipulate attributes
// *****************************************************

// **** DRAG *****
const drag = d3.drag()
  .on('start', (d) => {
    console.log('start', d)
    d.fx = d.x;
    d.fy = d.y;
  })
  .on('drag', (d) => {
    console.log('drag', d)
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  })
  .on('end', (d) => {
    d.fx = null;
    d.fy = null;
  });

  function mousemove() {
    if (!mousedownNode) return;
    // update drag line
    dragLine.attr('x2', d3.mouse(this)[0])
      .attr('y2', d3.mouse(this)[1])
  }

  function mouseup() {
    console.log('MOUSEUP')
    slashing = false
    if (mousedownNode) {
      console.log('hello')
      dragLine
        .classed('hidden', true)
      mousedownNode = null
      //Check if we're snapped to a node, then append a new line
    }
  }

  function slash(e) {
    console.log("should slash", e)
  }

let dragLine

// **** Node Functions  ****

let nodes
let mousedownNode
let linkCreated = false
let graph
let createdLink

let slashing = false

var enterNode = (selection) => {
  selection.classed('node', true)
    .append('circle')
    .attr("r", d => {
      if (d.constructor.name === 'Paypal') return 25
      return 0
    })
    .attr("xlink:href", d => {
      if (d.constructor.name != 'Paypal') return;
      return d.img
    })
    .attr("cx", d=> d.x)
    .attr("cy", d=> d.y)
    .attr("fill", d=> d.color)
    .on('mousedown', (d) => {
      if (linkCreated) return
      // select node
      mousedownNode = d;

      // reposition drag line
      dragLine
        .classed('hidden', false)
        .attr("x1", mousedownNode.x)
        .attr("y1", mousedownNode.y)
        .attr("x2", mousedownNode.x)
        .attr("y2", mousedownNode.y);
    })
    .on('mouseup', function (d) {
            console.log(selection, nodes)
      if (!mousedownNode) return;
      if (d.constructor.name != 'Paypal') return;
      dragLine
        .classed('hidden', true)
      graph.insert('line', '.node')
        .attr('stroke-width', 2)
        .attr('stroke', 'grey')
        .attr("x1", mousedownNode.x)
        .attr("y1", mousedownNode.y)
        .attr("x2", d.x)
        .attr("y2", d.y)
        .on('mousemove', slash)
      linkCreated = true
      createdLink()
    })

    selection.append("text")
      .classed('noselect', true)
      .attr('font-size', 40)
      .attr("x", d => (d.x - 22))
      .attr("y", d=> (d.y +15))
      .text((d) => {if(d.constructor.name != 'Paypal') return (d.emoji)})
      .on('mousedown', (d) => {
        if (linkCreated) return
        // select node
        mousedownNode = d;

        // reposition drag line
        dragLine
          .classed('hidden', false)
          .attr("x1", mousedownNode.x)
          .attr("y1", mousedownNode.y)
          .attr("x2", mousedownNode.x)
          .attr("y2", mousedownNode.y);
      })
      .on('mouseup', function (d) {
              console.log(selection, nodes)
        if (!mousedownNode) return;
        if (d.constructor.name != 'Paypal') return;
        dragLine
          .classed('hidden', true)
        graph.insert('line', '.node')
          .attr('stroke-width', 2)
          .attr('stroke', 'grey')
          .attr("x1", mousedownNode.x)
          .attr("y1", mousedownNode.y)
          .attr("x2", d.x)
          .attr("y2", d.y)
          .on('mousemove', slash)
        linkCreated = true
        createdLink()
      })


    selection.append("svg:image")
    .attr("xlink:href", d => d.img)
    .attr("x", d => (d.x-14))
    .attr("y", d => (d.y-14))
    .attr("height", d => d.img ? 28 : 0)
    .attr("width", d => d.img ? 28 : 0)
    .on('mouseup', function (d) {
            console.log(selection, nodes)
      if (!mousedownNode) return;
      if (d.constructor.name != 'Paypal') return;
      dragLine
        .classed('hidden', true)
      graph.insert('line', '.node')
        .attr('stroke-width', 2)
        .attr('stroke', 'grey')
        .attr("x1", mousedownNode.x)
        .attr("y1", mousedownNode.y)
        .attr("x2", d.x)
        .attr("y2", d.y)
        .on('mousemove', slash)
      linkCreated = true
      createdLink()
    })
};

var updateNode = (selection) => {
  selection
    .attr('fill', (d) => {
      if (d.constructor.name !== 'Paypal') return
      console.log('update', d.state)
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
    .classed('noselect', true)
    .attr('font-size', 30)
    .attr("x", d=> (getNodeById(d.sender).x- 15))
    .attr("y", d=> (getNodeById(d.sender).y + 10))
    .text('💵')
    .append('tspan')
    .text('🦄➡️🐯')
    .attr('font-size', 15)
    .attr('dx', -38)
    .attr('dy', 12)



    // .attr("r", 6)
    // .attr("fill", d => '#' + d.message.sig.slice(2,8))
    // .attr("fill-opacity", 0.5)
    // .attr('stroke-width', (d) => 3)
    // .attr('stroke', (d) => '#' + d.message.sig.slice(2,8))
    // .attr("cx", )
    // .attr("cy", )
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
  .attr("x", d => (getMsgPos(d,'x')- 15))
  .attr("y", d => (getMsgPos(d, 'y')+ 10))
}

var exitMessage = (selection) => {
  if(!selection.size()) return
  graph
  .insert('circle', '.node')
  .attr('fill',
    (nodes[0].badSpend) ? 'red' :
    '#7ed321')
  .attr('cx', d=> nodes[0].x)
  .attr('cy', d=> nodes[0].y)
  .attr('r', d=> 33)
  .attr('opacity', d=> 0)
  .transition()
  .duration(400)
  .attr('opacity', d=> 1)
  .transition()
  .duration(400)
  .attr('opacity', d=> 0)
  // .ease(d3.easeLinear)
  // .attr("x", d => (getMsgPos(d,'x')- 15))
  // .attr("y", d => (getMsgPos(d, 'y')+ 10))
}

// *****************************************************
// ** Graph component
// *****************************************************

class Graph extends Component {
    componentDidMount() {
      graph = d3.select(this.viz);
      this.d3Graph = d3.select(this.viz);
      dragLine = this.d3Graph.append('line')
        .attr('class', 'dragline hidden')
        .attr('stroke-width', 2)
        .attr('stroke', 'lightgrey')
    }

    shouldComponentUpdate(nextProps) {
      nodes = nextProps.nodes
      const {onClick} = this.props
      createdLink = this.props.createdLink
      this.d3Graph = d3.select(this.viz);
      d3.select(this.svg)
        .on('mousemove', mousemove)
        .on('mouseup', mouseup)
        .on('mousedown', (d) => {
          // select node
          slashing = (mousedownNode == null);
          console.log("slashing:", slashing)

          // reposition drag line
        })
      const d3Nodes = this.d3Graph.selectAll('.node')
        .data(nextProps.nodes, (node) => node.pid);
      d3Nodes.enter().append('g').call(enterNode)
      // .on('click', function(d){
      //   onClick(d, d3.event.pageX, d3.event.pageY)
      // })
      d3Nodes.exit().remove();
      d3Nodes.call(updateNode)

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
      const msgEnter = d3Messages.enter().insert('text', '.node').call(enterMessage);
      d3Messages.exit().call(exitMessage).remove() //remove();
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
        <svg ref={el => this.svg = el} width={width} height={height}>
          <g ref={el => this.viz = el} />
        </svg>
      );
    }
}

export default Graph;
