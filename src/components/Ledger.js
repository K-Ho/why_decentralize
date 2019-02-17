import React, { Component } from 'react';

class Ledger extends Component {
	render() {
		const paypal = this.props.paypal
		const pid = paypal.pid
		
		let users = Object.keys(paypal.state).filter((x) => { return x != pid })

		if (!this.props.linked) {
			users.shift()
		}

		const balances = users.map( x => {
			return <div className="ledger-row">
						<span className="ledger-name">{'0x' + x.slice(2,8).toUpperCase()}</span>
						<span className="ledger-balance">{paypal.state[x].balance}</span>
					</div>
		} )

		return(
			<div className="ledger">
				<div className="ledger-row">
					<span id="venmo-database">Venmo's Database</span>
				</div>
				{balances}
			</div>
		);
	}
}

export default Ledger;