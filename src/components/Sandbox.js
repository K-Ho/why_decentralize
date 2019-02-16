import React, { Component } from 'react';
import {nodes, network} from '../viz/createNetSim'
import Graph from './Graph.js'
import * as d3 from 'd3'

const TICK_LENGTH = 300 //ms

// graph payload (with minimalist structure)
const data = {
  nodes: [],
  links: []
}

for (const node of nodes) {
  // connect them
  for (const peer of network.peers[node.pid]) {
    data.links.push({
      source: node.pid,
      target: peer.pid
    })
  }
}
nodes[0].x = 100
nodes[0].y = 100

class Sandbox extends Component {
  constructor() {
    super()
    this.state = {
      speed: 1,
      messages: []
    }
  }

  componentDidMount() {
    this.timer = d3.interval(this.tick.bind(this), TICK_LENGTH/this.state.speed);
  }

  setMessageQueue(currNetwork){
    let oldQ = currNetwork.messageQueue
    const messages = []
    Object.keys(oldQ).forEach(function(key,index) {
      for (let message of oldQ[key]) {
        const newMsg = {...message, time: currNetwork.time}
        newMsg.recipient = newMsg.recipient.pid
        messages.push(newMsg)
      }
    });
    return messages
  }

  tick() {
    network.tick()
    const messages = this.setMessageQueue(network)
    this.setState({messages: messages})
  }

  getCurrNode(nodeId) {
    if (network) {
      return network.agents.find((node) => node.pid === nodeId);
    }
  }

  // onClickNode (node, x, y) {
  //   const {clickedNode} = this.state

  //   if (clickedNode && node.pid === clickedNode.pid) {
  //     this.setState({clickedNode: null})
  //   } else {
  //     this.setState({clickedNode: {...node, clickedX: x, clickedY: y}})
  //   }
  // };

  spend(currNode){
    const node = this.getCurrNode(currNode.pid)
    const tx = node.generateTx(node.getRandomReceiver(), 10)
    node.applyTransaction(tx)
    // Broadcast this tx to the network
    network.broadcast(node.pid, tx)
    //TODO copy from createsim.js

    // initiate random spend
  }

  render() {
    const {messages, speed} = this.state
    return (
            <Graph
              nodes={nodes}
              links={data.links}
              messages = {messages || []}
           />
    );
  }
}

export default Sandbox;
