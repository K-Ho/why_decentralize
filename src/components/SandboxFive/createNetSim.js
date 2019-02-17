var EthCrypto = require('eth-crypto')
var NetworkSimulator = require('./networksim')
var Client = require('./Client')
var Paypal = require('./Paypal')
var util = require('util')

// ****** Test this out using a simulated network ****** //
const numNodes = 13
const network = new NetworkSimulator(10, 0);
const nodes = []

// Create new nodes based on our wallets, and connect them to the network/
for (let i = 0; i <= numNodes; i++) {
  nodes.push(new Paypal(network))
  network.connectPeer(nodes[i], Math.random() > 0.5 ? 2 : 1)
}

// console.log(paypal.state)
let state = {}
for (var i = nodes.length - 1; i >= 0; i--) {
	state[nodes[i].wallet.address] = {
			                balance: 100,
			                nonce: -1
            			  }
        
}

for (var i = nodes.length - 1; i >= 0; i--) {
	nodes[i].state = state
}
// for (let i = 0; i < 3; i ++) {
// console.log(network.peers[nodes[i].pid].length)
// }
// const tx1 = nodes[1].generateTx(nodes[2].pid, 14, 'send')
// network.broadcastTo(nodes[1].pid, nodes[0], tx1)
network.run(100)
module.exports = {nodes, network}
