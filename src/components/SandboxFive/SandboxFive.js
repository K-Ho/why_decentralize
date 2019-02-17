import React, { Component } from 'react';
import {nodes, network} from './createNetSim'
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
      source: node,
      target: peer
    })
  }
}

// data.links.push({
//       source: nodes[2],
//       target: network.paypal
//     })

nodes[0].x = 500
nodes[0].y = 60

nodes[1].x = 35
nodes[1].y = 110

nodes[2].x = 460
nodes[2].y = 140

nodes[3].x = 85
nodes[3].y = 80

nodes[4].x = 300
nodes[4].y = 120

nodes[5].x = 360
nodes[5].y = 50

nodes[6].x = 570
nodes[6].y = 270

nodes[7].x = 130
nodes[7].y = 190

nodes[8].x = 337
nodes[8].y = 270

nodes[9].x = 340
nodes[9].y = 220

nodes[10].x = 160
nodes[10].y = 240

nodes[11].x = 530
nodes[11].y = 110

nodes[12].x = 450
nodes[12].y = 215

nodes[13].x = 250
nodes[13].y = 260

nodes[0].emoji = '🐷'
nodes[1].emoji = '🦄'
nodes[2].emoji = '🐯'
nodes[3].emoji = '🐹'
nodes[4].emoji = '🐸'
nodes[5].emoji = '🦊'
nodes[6].emoji = '🐨'
nodes[7].emoji = '🐔'
nodes[8].emoji = '🐧'
nodes[9].emoji = '🦁'
nodes[10].emoji = '🐵'
nodes[11].emoji = '🐼'
nodes[12].emoji = '🦑'
nodes[13].emoji = '🐬'

class SandboxFive extends Component {
  constructor() {
    super()
    this.state = {
      speed: 1,
      messages: [],
    }
  }

  componentDidMount() {
    this.timer = d3.interval(this.tick.bind(this), TICK_LENGTH/this.state.speed);
    d3.interval(this.randomSpend.bind(this), 7000);
  }

  randomSpend() {
    const sender = nodes[Math.floor(Math.random() * (nodes.length))]
    const receiver = nodes[Math.floor(Math.random() * (nodes.length))]
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

  spend(currNode){
    console.log(currNode)
    const node = this.getCurrNode(currNode.pid)

    const recipient = nodes[Math.floor(Math.random() * (nodes.length))]
    const tx = node.generateTx(recipient.pid, 10, 'send')
    // Broadcast this tx to the network
    network.broadcast(node.pid, tx)
    //TODO copy from createsim.js
  }

  render() {
    const {messages, speed} = this.state
    return (
      <div id="sandbox-container">
        <Graph
          nodes={nodes}
          links={data.links}
          messages = {messages || []}
        />
      </div>
    );
  }
}

export default SandboxFive;
