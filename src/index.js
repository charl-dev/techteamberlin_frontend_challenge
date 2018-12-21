import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter, Route} from 'react-router-dom'
import App from "./components/Home";
import * as serviceWorker from "./serviceWorker";

import {Provider} from 'react-redux'
import configureStore from './utils/configureStore';
import NotFound from "./components/NotFound";
import Search from "./components/Search";
import Main from "./Layouts/Main";
const store = configureStore()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main />
    </Provider>
  </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();