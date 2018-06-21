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
          <h1 className="App-title">Tree</h1>
        </header>
        <div className="app-container">
          <div className="app-left-pane">
            <Tree contents={contents}/>
          </div>
          <div className="app-right-pane">
            some stuff here
          </div>
        </div>
      </div>
    );
  }
}

export default App;
