var network = require('./networksim')
var Client = require('./Client')
var Paypal = require('./Paypal')
const alice = new Client()
const bob = new Client()
const paypal = new Paypal()

for (let a of testAgents) {
  network.connectPeer(a, 1)
}
network.broadcast('karl', 'testing!')
network.broadcast('aparna', 'besting!')
console.log(network)
network.run(100)
