


**Sandbox 0**: 
Hub with two spokes: Paypal node connected to node Bob.
Drag a line from Reader to Paypal to connect it
Reader has 50 💵. When the line is drawn to paypal it turns into $50
Above both Reader and Bob are their balances as represented in Paypal’s ledger
In the sidebar, we have Paypal’s ledger with Reader: $50, Bob: $0
One button for Reader sending $5 to Bob
If Reader runs out of money, Bob will send a transaction of $50 to Reader
When Reader sends money to Bob, it’s represented as a message that travels along a link to Paypal. 
The Paypal node flashes green, and updates it’s ledger (as well as the balance numbers above Reader and Bob)

**Text 0**:
In the real world there are more than 2 users. Paypal looks a bit more like this:

**Sandbox 1**:
- Hub and Spoke: Paypal Node connected to 5 - 15 user nodes. Our reader watches as the nodes send messages to the Paypal node trying to spend money. The Paypal node updates it’s ledger (Subtracting money from sender, adding money to the receiver).  
	Timing: one random node sends money to another random node every 0.5s
User still has a button to send $5 to a random user

**Text 1**
This is how centralized payment systems work. They’re super efficient and simple. (Our implementation of this Paypal operator is under 200 lines of code!) Having a single powerful server means that you can handle millions of transactions per second. This system is very fast and makes having many users easy. BUT, not everyone can use these systems.

**Sandbox 2** - Try to draw a line connecting a User from another country to Paypal, Paypal rejects them.

**Text 2**: Even users already connected could be censored. What if Paypal decides they don't want like people with hats anymore.

**Sandbox 3** - Reader’s transactions gets censored by Paypal

**Text 3**: Also, since Paypal is the only entity with control of everyone's balances, they can 

**Sandbox 4** - Have a button “Mint $1,000” that will increase Paypal’s balance in their ledger

**Text 4**
What if we could create an open financial system that doesn’t exclude or censor people, or allow the minting of arbitrary amounts of money? 

- Anyone should be able to join the network.
- The network should be censorship-resistant.
- We should have more than just one entity in charge of the ledger of everyone’s balance to prevent minting

Here is a basic solution: what if everyone stores the entire ledger of everyone’s money and every time they receive or want to send a transaction, they notify everybody nearby?

**Sandbox 5:** P2P Paypal visualization

**Text 5:** 
Let’s see if it passes the tests: 
Anyone should be able to join the network:

**Sandbox 6:**
Have a paypal node in a network of nodes in country A. draw a line to paypal, censored. Draw a line to another node, you’re connected!

**Text 7:**
2. It should be censorship resistant

**Sandbox 7:**
Reader controls a node connected to 3 node, 1 of which is Paypal. Node sends transaction, paypal censors it, but the other nodes accept it.

**Text 8:**
3. We should have more than just one entity in charge of the ledger of everyone’s balance to prevent minting

**Sandbox 8:** 
Button for paypal to mint themselves money, only updates their own ledger. Everyone else’s ledge has Paypal: $0
Paypal spends $1,000, all other nodes reject the transaction.


Check out [Cryptoeconomics.study](https://Cryptoeconomics.study) to learn more!
