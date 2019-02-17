import React, { Component } from 'react';
import {nodes, network} from './createNetSim'
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
    data.links.push({
      source: node,
      target: peer
    })
  }
}

// data.links.push({
//       source: nodes[2],
//       target: network.paypal
//     })

// Venmo
nodes[0].x = 200
nodes[0].y = 145

nodes[1].x = 25
nodes[1].y = 160

nodes[2].x = 330
nodes[2].y = 270

nodes[3].x = 25
nodes[3].y = 80

nodes[4].x = 300
nodes[4].y = 120

nodes[5].x = 360
nodes[5].y = 160

nodes[6].x = 130
nodes[6].y = 80

nodes[7].x = 130
nodes[7].y = 200


nodes[0].color = "#0089FF"
nodes[0].img = "venmo.svg"
nodes[1].emoji = '🦄'
nodes[2].emoji = '🐯'
nodes[3].emoji = '🐹'
nodes[4].emoji = '🐸'
nodes[5].emoji = '🦊'
nodes[6].emoji = '🐨'
nodes[7].emoji = '🐔'

class SandboxOne extends Component {
  constructor() {
    super()
    this.state = {
      speed: 1,
      messages: [],
      minted: 0
    }
  }

  componentDidMount() {
    this.timer = d3.interval(this.tick.bind(this), TICK_LENGTH/this.state.speed);
    d3.interval(this.randomSpend.bind(this), 2000);
  }

  randomSpend() {
    const sender = nodes[Math.floor(Math.random() * (nodes.length-2) + 2)]
    const receiver = nodes[Math.floor(Math.random() * (nodes.length-1) + 1)]
    if(sender.pid===receiver.pid) return
    const tx = sender.generateTx(receiver.pid, 10, 'send')
    // Broadcast this tx to the network
    network.broadcast(sender.pid, tx)
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

  mint(currNode){
    console.log(currNode)

    const recipient = nodes[4]
    const tx = currNode.generateTx(recipient.pid, 20, 'mint')
    // Broadcast this tx to the network
    currNode.applyTransaction(tx)
    //TODO copy from createsim.js
    this.setState({minted: this.state.minted+1})
  }

  render() {
    const {messages, speed, minted} = this.state
    return (
      <div id="sandbox-container">
        <Graph
          nodes={nodes}
          links={data.links}
          messages = {messages || []}
          minted = {minted}
        />
        <Ledger
          paypal = {network.paypal}
        />
        <Controls
          spend={this.mint.bind(this, nodes[0])}
        />
      </div>
    );
  }
}

export default SandboxOne;
