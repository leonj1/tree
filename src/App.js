import React, {Component} from 'react';
import './App.css';
import './components/Tree.css';
import Branch from './components/Branch';

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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tree</h1>
        </header>
        <div className="app-container">
          <div className="app-left-pane">
            <Branch key="root"
                    parent=""
                    data={contents}
                    thestyle="tree-branch"
                    level={1}/>
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
