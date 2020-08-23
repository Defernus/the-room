import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css'

import Start from './components/Start'
import Chat from './components/Chat'
import Join from './components/Join'
import NotFound from './components/NotFound'

const App = () => (
	<Router>
		<Route path="/" exact component={Start} />
		<Route path="/404" exact component={NotFound} />
		<Route path="/chat-room" component={Chat} />
		<Route path="/join-room" component={Join} />
	</Router>
);

export default App;
