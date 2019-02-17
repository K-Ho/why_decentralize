import React, { Component } from 'react';
import {nodes, network} from '../viz/createNetSim'
import Graph from './Graph.js'
import Controls from './Controls.js'
import Ledger from './Ledger.js'
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
    // data.links.push({
    //   source: node,
    //   target: peer
    // })
  }
}

data.links.push({
      source: nodes[2],
      target: network.paypal
    })

nodes[0].x = 200
nodes[0].y = 145

nodes[1].x = 25
nodes[1].y = 160

nodes[2].x = 330
nodes[2].y = 270

nodes[0].color = "#0089FF"
nodes[0].img = "venmo.svg"

nodes[1].emoji = '🦄'
nodes[2].emoji = '🐯'

class Sandbox extends Component {
  constructor() {
    super()
    this.state = {
      speed: 1,
      messages: [],
      disabled: true
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

  createdLink() {
    this.setState({disabled: false})
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
    console.log(currNode)
    const node = this.getCurrNode(currNode.pid)
    const tx = node.generateTx(nodes[2].pid, 10, 'send')
    // Broadcast this tx to the network
    network.broadcast(node.pid, tx)
    //TODO copy from createsim.js
  }

  render() {
    const {messages, speed, disabled} = this.state
    return (
      <div id="sandbox-container">
        <Graph
          nodes={nodes}
          links={data.links}
          messages = {messages || []}
          createdLink = {this.createdLink.bind(this)}
        />
        <Ledger
          linked = {!disabled}
          paypal = {network.paypal}
        />
        <Controls
          spend={this.spend.bind(this, nodes[1])}
          disabled = {disabled}
        />
      </div>
    );
  }
}

export default Sandbox;
