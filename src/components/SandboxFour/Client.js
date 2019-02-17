var EthCrypto = require('eth-crypto')

class Client {
    constructor(network) {
        this.wallet = EthCrypto.createIdentity()
        this.nonce = -1;
        this.network = network
        this.pid = this.wallet.address
    }

    toHash(data) {
        const dataStr = JSON.stringify(data)
        return EthCrypto.hash.keccak256(dataStr)
    }

    sign(message) {
        const messageHash = this.toHash(message)
        return EthCrypto.sign(
            this.wallet.privateKey,
            messageHash
        )
    }

    verify(signature, messageHash, address) {
        const signer = EthCrypto.recover(signature, messageHash)
        return signer === address
    }

    generateTx(to, amount, type) {
        const unsignedTx = {
            type: type,
            amount: amount,
            from: this.wallet.address,
            to: to,
            nonce: ++this.nonce
        }
        const tx = {
            contents: unsignedTx,
            sig: this.sign(unsignedTx)
        }
        return tx
    }
    tick() {}
}

module.exports = Client

