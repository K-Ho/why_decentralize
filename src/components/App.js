import React from 'react';
import '../styles/App.css';
import Sandbox from './Sandbox';
import SandboxOne from './SandboxOne/SandboxOne';
import SandboxTwo from './SandboxTwo/SandboxTwo';
import SandboxThree from './SandboxThree/SandboxThree';
import SandboxFour from './SandboxFour/SandboxFour';

import SandboxFive from './SandboxFive/SandboxFive';



const App = () => {
  return (
    <div className="App">
    	<div id="title">
	    	<h1>
	    		Why Decentralize?
	    	</h1>
    	</div>
    	<p>There’s a lot of talk in the blockchain space about <strong>decentralization</strong>, but what is it about centralization that we wish to undo? Is there really anything wrong with centralized systems?  Let’s dig deeper. We’ll show you what really happens when you (🦄) use a centralized financial system like Venmo or your bank. </p>
          <br/>
          <p className="helper-text">Draw a line from yourself to Venmo to join.<br/>Then try sending some money to @tiger!</p>
        <div className="interactive">
            <Sandbox/>
        </div>
<br/>
<p>In the real world there are more than 2 users. A centralized payment network looks a bit more like this. </p>
<br/>
<p className="helper-text">Send money to a friend!</p>
<div className="interactive">
    <SandboxOne/>
</div>

<p>This is how centralized payment systems work. They’re super efficient and simple. (Our implementation of this Paypal operator is under 200 lines of code!) Having a single powerful server means that you can handle millions of transactions per second. This system is very fast and makes having many users easy. But not everyone can use these systems. 1.7 billion adults, largely in developing countries, remain unbanked.
 </p>
<br/>
 <p className="helper-text">Try to connect to transact with your friends!</p>
<div className="interactive">
    <SandboxTwo/>
</div>

<br/>
<p>If you happen to be lucky enough to have been born into a developed country like the United States of Amphibia, then you typically have access to traditional financial systems. These systems are not as impartial as one would hope. Having a single server accept all transactions means that the server has control over which orders get processed. It is possible for specific groups such as the small Unicorn population to have their orders censored by these central operators.</p>
<br/>
<p className="helper-text">Try to transact with your friends!</p>
    <div className="interactive">
    <SandboxThree/>
    </div>
<br/>
<p>Centralized financial systems are not required to be transparent about their internal processes. Besides censorship, it is possible for other subtler abuses of power. The lack of transparency allows central operators like Wells Frogo to mint arbitrary amounts of money for those at the top. We put a lot of trust in central operators to keep our funds secure, and for banks, we trust that they won't print so much money that everyone's money becomes worthless.</p>
<br/>
<p className="helper-text">You're paypal! Click to mint money for frog!</p>
    <div className="interactive">
    <SandboxFour/>

    </div>
    <br/>
<p>What if we could create an open financial system that doesn’t exclude or censor people, or allow the minting of arbitrary amounts of money? <br/><br/>

1. Anyone should be able to join the network.<br/>
2. The network should be censorship-resistant.<br/>
3. More than one entity should be in charge of maintaining balances to prevent minting.<br/><br/>

Good news! Lots of people are learning about and building such networks.</p>
<br/>
<p className="helper-text">Part of the solution is what's called a peer-to-peer network, where everyone is connected to each other.</p>
    <div id="interactive-five">
    <SandboxFive/>
    </div>
<h3 id="bottom">Check out <a href="http://cryptoeconomics.study">cryptoeconomics.study</a> to learn more!</h3>

</div>
  );
}

export default App;
