import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChatContextProvider } from './Context/Chatcontext';


ReactDOM.render(<ChatContextProvider><App /></ChatContextProvider>, document.getElementById('root'))