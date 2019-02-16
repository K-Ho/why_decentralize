var EthCrypto = require('eth-crypto')
var Client = require('./Client')

class User extends Client {
    constructor(network) {
        super(network)
    }
    generateTx(to, amount, type) {
        const tx = super.generateTx(to, amount, type)
        this.network.broadcast(this.pid, tx)
    }
}

module.exports = User;
