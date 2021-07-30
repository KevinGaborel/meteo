import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Error from './components/Error'
import Home from './pages/Home'

ReactDOM.render(
  <React.StrictMode>
   {/*<Provider store={store}>*/} 
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:city">
          <Home />
        </Route>
        <Route>
         <Error />
        </Route>
      </Switch>
    </Router>
    {/*</Provider>*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
