var EthCrypto = require('eth-crypto')
var NetworkSimulator = require('./networksim')
var Client = require('./Client')
var Paypal = require('./Paypal')
var util = require('util')

// ****** Test this out using a simulated network ****** //
const numNodes = 7
const network = new NetworkSimulator(10, 0);
const nodes = []
// Create new nodes based on our wallets, and connect them to the network

const paypal = new Paypal(network);

// I want a reference to paypal
network.paypal = paypal

network.peers[paypal.pid] = []


nodes.push(paypal)
for (let i = 1; i <= numNodes; i++) {
  nodes.push(new Client(network))
 if(i>=2) network.connectToPaypal(nodes[i], paypal)
}
network.peers[nodes[1].pid] = []
console.log(network.peers)
// console.log(paypal.state)
const amounts = [38, 98, 28, 76, 12, 86, 89]
for (let i = 1; i <=numNodes; i++) {
  const tx = nodes[0].generateTx(nodes[i].pid, amounts[i-1], 'mint')
  nodes[0].applyTransaction(tx)
}
// for (let i = 0; i < 3; i ++) {
// console.log(network.peers[nodes[i].pid].length)
// }
// const tx1 = nodes[1].generateTx(nodes[2].pid, 14, 'send')
// network.broadcastTo(nodes[1].pid, nodes[0], tx1)
network.run(100)
console.log('state',paypal.state)
module.exports = {nodes, network}
