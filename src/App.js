import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from './components/Tree';

const contents = {
    name: "react-treebeard",
    toggled: false,
    children: [
        {
            name: "example",
            children: [
                {
                    name: "app.js"
                },
                {
                    name: "data.js"
                },
                {
                    name: "index.html"
                },
                {
                    name: "styles.js"
                },
                {
                    name: "webpack.config.js"
                }
            ]
        },
        {
            name: "node_modules",
            loading: true,
            children: []
        },
        {
            name: "src",
            children: [
                {
                    name: "components",
                    children: [
                        {
                            name: "decorators.js"
                        },
                        {
                            name: "treebeard.js"
                        }
                    ]
                },
                {
                    name: "index.js"
                }
            ]
        },
        {
            name: "themes",
            children: [
                {
                    name: "animations.js"
                },
                {
                    name: "default.js"
                }
            ]
        },
        {
            name: "Gulpfile.js"
        },
        {
            name: "index.js"
        },
        {
            name: "package.json"
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
