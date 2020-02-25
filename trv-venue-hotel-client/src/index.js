import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import './media.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import  configurestore from  './store/configurestore';
import {createBrowserHistory} from 'history';
import routes from './routes'
const store=configurestore();

ReactDOM.render(
<Provider store={store}>
<Router history={createBrowserHistory}>
{routes}
</Router>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
