import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as challengesActions from './actions/challengesActions';  


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {  
  return {challenges: state.challenges}
}

function mapDispatchToProps(dispatch) {  
  return {actions: bindActionCreators(challengesActions, dispatch)}
}


// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);  

