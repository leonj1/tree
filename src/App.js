import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from './components/Tree';

const contents = {
  name: "react-treebeard",
  foo: "bar",
  toggled: false,
  children: [
    {
      name: "zookeeper",
      children: []
    },
    {
      name: "apps",
      children: [
        {
          name: "abc",
          contents: "this is some contents",
          create_date: "2018 06 24",
          modified_date: "2018 06 24",
          access_date: "2018 06 24",
        },
        {
          name: "def"
        },
        {
          name: "ghi"
        }
      ]
    },
    {
      name: "node_modules",
      loading: true,
      children: []
    },
    {
      name: "engines",
      children: [
        {
          name: "abc"
        },
        {
          name: "def"
        }
      ]
    },
    {
      name: "resources",
      children: [
        {
          name: "clusters",
          children: [
            {
              name: "abc"
            },
            {
              name: "def"
            },
            {
              name: "zk-ghi"
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Tree contents={contents}/>
      </div>
    );
  }
}

export default App;
