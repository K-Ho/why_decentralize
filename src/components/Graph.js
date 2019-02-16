import React, { Component } from 'react';
import * as d3 from 'd3';

var width = '100%';
var height = '100%';
//Make responsive
var force = d3.forceSimulation()

var zoom = d3.zoom();

// *****************************************************
// ** d3 functions to manipulate attributes
// *****************************************************

// **** Node Functions  ****

var enterNode = (selection) => {
  selection.classed('node', true)
    .append('circle')
    .attr("r", d=>{
      if (d.constructor.name === 'Spender') return 20

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
};

var updateLink = (selection) => {
  selection.attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
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
  return force.nodes().find(
    (node) => node.pid === id
  )
}

const getMsgPos = (msg, coord) => {
  const distance = msg.time - msg.sentTime
  const length = msg.recvTime - msg.sentTime
  const progress = distance/length
  const recCoord = getNodeById(msg.recipient)[coord]
  const sentCoord = getNodeById(msg.sender)[coord]
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

// **** Graph Functions  ****

var updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call(updateLink)
  // selection.selectAll('.message')
  //   .call(updateMessage)
};

var zoomed = (selection, width, height) => {
  // Need to get the geometry right here
  selection.attr('transform',
            'translate(' + (width/2 - 900) + ', ' + (height/2 - 400) + ')scale(' + 1.5 + ')');
  console.log("Zoomed", width, height)
};

var resize = (selection) => {
  console.log("Resized")
  width = window.innerWidth;
  height = window.innerHeight;
};

// *****************************************************
// ** Graph component
// *****************************************************

class Graph extends Component {
    componentDidMount() {
      this.d3Graph = d3.select(this.viz);
      // force.on('tick', () => {
      //   // after force calculation starts, call updateGraph
      //   // which uses d3 to manipulate the attributes,
      //   // and React doesn't have to go through lifecycle on each tick
      //   this.d3Graph.call(updateGraph);
      // });

      // this.d3Graph.call(resize);
      // d3.select(window).on("resize", () => {
      //   this.d3Graph.call(resize);
      // });
    }

    shouldComponentUpdate(nextProps) {
      const {onClick} = this.props
      this.d3Graph = d3.select(this.viz);
      console.log('nextPropsNodes', nextProps.nodes)
      const d3Nodes = this.d3Graph.selectAll('.node')
        .data(nextProps.nodes, (node) => node.pid);
      d3Nodes.enter().append('g').call(enterNode)
      .on('click', function(d){
        onClick(d, d3.event.pageX, d3.event.pageY)
      })
      d3Nodes.exit().remove();
      // d3Nodes.call(updateNode);

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
      force.nodes(nextProps.nodes)
        .force("link", d3.forceLink(nextProps.links)
          .id(d => d.pid)
          .distance(d=>50)
          .strength(.3)
        );
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
