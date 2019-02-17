import React, { Component } from 'react';

class Ledger extends Component {
	render() {
		const paypal = this.props.paypal
		const pid = paypal.pid

		let users = Object.keys(paypal.state).filter((x) => { return x != pid })

		const usernames = ['@unicorn', '@tiger', '@hamster', '@ribbit', '@fox', '@koala', '@chicken']

		const balances = users.map( (x, i) => {
			return <div className="ledger-row">
						<span className="ledger-name">{usernames[i]}</span>
						<span className="ledger-balance">{'$' + paypal.state[x].balance + '.00'}</span>
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
