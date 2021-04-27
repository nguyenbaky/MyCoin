import './App.css';
 import {message} from "antd";
import Dashboard from "./view/dashboard";
import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import Login from './view/login/index'
import {PrivateRoute} from './component/PrivateRoute'

message.config({
  duration: 2,
});

const App = props => (
  <Router>
      <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          {/* <PrivateRoute path='/'
                        component={Dashboard}/> */}
      </Switch>
  </Router>
)

export default App;
