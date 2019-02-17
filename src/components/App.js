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
    	<p>Hello 🦄! There’s a lot of talk in the blockchain space about ✨decentralization✨, but what it is about centralization that we wish to undo? Is there really anything wrong with centralized systems?  Let’s dig deeper. We’ll show you what really happens when you (🦄) use a centralized financial system like Venmo or your bank. </p>
        <br/>
        <p className="helper-text">Draw a line from yourself to Venmo to connect. Then try sending some money to 🐯!</p>
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

<div className="interactive">
    <SandboxTwo/>
  <p className="helper-text">Try to connect to transact with your friends!</p>
</div>


<p>In vitae turpis massa sed elementum. Donec ultrices tincidunt arcu non sodales neque sodales. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Risus ultricies tristique nulla aliquet enim tortor at auctor. Volutpat blandit aliquam etiam erat velit scelerisque. Eget egestas purus viverra accumsan in. Eget felis eget nunc lobortis mattis aliquam. Tellus at urna condimentum mattis. Dictum at tempor commodo ullamcorper a lacus vestibulum sed arcu. Tincidunt eget nullam non nisi. Netus et malesuada fames ac turpis egestas maecenas pharetra. Nunc eget lorem dolor sed viverra ipsum nunc. Tincidunt ornare massa eget egestas purus viverra accumsan. Scelerisque felis imperdiet proin fermentum leo vel. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Nulla aliquet enim tortor at auctor urna nunc. Nunc non blandit massa enim nec dui.</p>
    <div className="interactive">
    <SandboxThree/>
    <p className="helper-text">Try to connect to transact with your friends!</p>
    </div>

    <p>t amet mauris commodo quis. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus.</p>
    <div className="interactive">
    <SandboxFour/>
    <p className="helper-text">You're paypal! Click </p>
    </div>

<p>Purus ut faucibus pulvinar elementum integer enim. Sagittis id consectetur purus ut faucibus pulvinar elementum integer enim. Egestas dui id ornare arcu odio ut sem. Consequat mauris nunc congue nisi vitae suscipit. Morbi tincidunt ornare massa eget. Nec tincidunt praesent semper feugiat. Ac auctor augue mauris augue neque gravida in. Nunc sed blandit libero volutpat sed cras ornare arcu dui. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Sed elementum tempus egestas sed sed risus. In hendrerit gravida rutrum quisque non tellus. Molestie at elementum eu facilisis. Odio aenean sed adipiscing diam donec adipiscing tristique. Sollicitudin tempor id eu nisl. Vel pharetra vel turpis nunc eget lorem dolor.</p>
    <div className="interactive">
    <SandboxFive/>
    <p className="helper-text">Try to connect to transact with your friends!</p>
    </div>
<p>Dui sapien eget mi proin sed libero enim sed. Sapien eget mi proin sed libero enim sed faucibus. Augue ut lectus arcu bibendum at varius. Odio tempor orci dapibus ultrices in iaculis nunc. Mauris cursus mattis molestie a iaculis at erat pellentesque. Quam nulla porttitor massa id. Sapien eget mi proin sed libero enim. Eget mauris pharetra et ultrices neque ornare. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Iaculis eu non diam phasellus vestibulum lorem sed. Scelerisque fermentum dui faucibus in. Eget egestas purus viverra accumsan in nisl. Duis ultricies lacus sed turpis tincidunt id aliquet.</p>

<p>Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Arcu risus quis varius quam quisque id diam vel quam. Semper viverra nam libero justo. Arcu non sodales neque sodales ut etiam sit. Et netus et malesuada fames. Consequat mauris nunc congue nisi vitae suscipit tellus mauris. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit. Viverra nibh cras pulvinar mattis nunc sed blandit. Sed id semper risus in. Et netus et malesuada fames ac turpis egestas integer. Malesuada nunc vel risus commodo viverra maecenas accumsan. Sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc. Netus et malesuada fames ac turpis egestas sed tempus urna. Consequat ac felis donec et odio pellentesque diam volutpat. Quis lectus nulla at volutpat diam ut venenatis tellus. Congue mauris rhoncus aenean vel elit. Nunc lobortis mattis aliquam faucibus purus. Sapien faucibus et molestie ac feugiat sed lectus. Mauris pellentesque pulvinar pellentesque habitant morbi. Gravida quis blandit turpis cursus in hac.</p>
    </div>
  );
}

export default App;
