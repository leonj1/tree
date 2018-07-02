import React, {Component} from 'react';
import ZkUi from './ZkUi';
import './App.css';
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {
  getInitialPath,
  getPath
} from "./redux/actions";

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
  constructor(props) {
    super(props);
    this.changePathHandler = this.changePathHandler.bind(this);
    this.branchClicked = this.branchClicked.bind(this);
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/:bri" render={() => (
            <ZkUi status={this.props.status}
                  contents={this.props.contents}
                  getInitialPathFoo={this.changePathHandler}
                  branchClicked={this.branchClicked}/>
          )}/>
        </div>
      </Router>
    );
  }

  changePathHandler = function(resource, path) {
    this.props.getInitialPathProp(resource, path);
  };

  branchClicked = function(path) {
    this.props.branchClickedProp(path);
  };
}

const mapStateToProps = state => {
  return {
    request: state.request,
    status: state.status,
    contents: state.contents
  }
};

// redux actions
const mapDispatchToProps = dispatch => {
  return {
    getInitialPathProp: function(resource, path) {
      dispatch(getInitialPath(resource, path));
    },
    branchClickedProp: function(path) {
      dispatch(getPath(path));
    }
  }
};

const ReduxApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default ReduxApp;
