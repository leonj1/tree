import React, {Component} from 'react';
import ZkUi from './ZkUi';
import './App.css';

import { connect } from 'react-redux';
import { submitSecret, fetchSecret, clearPastRequest } from './redux/actions';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

const contents = {
  name: "/",
  foo: "bar",
  toggled: false,
  collapsed: false,
  checkedHasChildren: true,
  children: [
    {
      name: "zookeeper",
      collapsed: true,
      checkedHasChildren: false,
      children: []
    },
    {
      name: "apps",
      collapsed: true,
      checkedHasChildren: true,
      children: [
        {
          name: "abc",
          contents: "this is some contents",
          create_date: "2018 06 24",
          modified_date: "2018 06 24",
          access_date: "2018 06 24",
          checkedHasChildren: true
        },
        {
          name: "def",
          checkedHasChildren: true
        },
        {
          name: "ghi",
          checkedHasChildren: true
        }
      ]
    },
    {
      name: "node_modules",
      loading: true,
      collapsed: true,
      checkedHasChildren: false,
      children: []
    },
    {
      name: "engines",
      collapsed: true,
      checkedHasChildren: true,
      children: [
        {
          name: "abc",
          checkedHasChildren: true
        },
        {
          name: "def",
          checkedHasChildren: true
        }
      ]
    },
    {
      name: "resources",
      collapsed: true,
      checkedHasChildren: true,
      children: [
        {
          name: "clusters",
          checkedHasChildren: true,
          collapsed: true,
          children: [
            {
              name: "abc",
              checkedHasChildren: true
            },
            {
              name: "def",
              checkedHasChildren: true,
            },
            {
              name: "zk-ghi",
              checkedHasChildren: true
            }
          ]
        }
      ]
    }
  ],
  active: true
};

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route path="/:bri" render={(props) => (
            <ZkUi/>
          )}/>
        </div>
      </Router>
    );
  }

  createSecretHandler = secret => {
    this.props.createSecretProp(secret);
  };

  fetchSecret = token => {
    this.props.fetchSecretProp(token);
  };

  clearRequest = () => {
    this.props.clearPastRequest();
  }

}

// export default App;

const mapStateToProps = state => {
  return {
    secret: state.secret,
    token: state.token,
    request: state.request
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createSecretProp: function(secret) {
      dispatch(submitSecret(secret));
    },
    fetchSecretProp: function(token) {
      dispatch(fetchSecret(token));
    },
    clearPastRequest: function() {
      dispatch(clearPastRequest());
    }
  }
};

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
