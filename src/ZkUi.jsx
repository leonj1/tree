import React, { Component } from 'react';
import Tree from './components/Tree';
import PropTypes from 'prop-types';

const convertToObject = (url) => {
  const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
  let params = {};

  for (let i = 0; i < arr.length; i += 2) {
    const key = arr[i], value = arr[i + 1];
    params[key] = value; // build the object = { limit: "10", page:"1", status:"APPROVED" }
  }
  return params;
};
// const uri = this.props.location.search; // "?status=APPROVED&page=1&limit=20"
// const obj = convertToObject(uri);
// console.log(obj); // { limit: "10", page:"1", status:"APPROVED" }
// obj.status
// obj.page
// obj.limit

class ZkUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "/"
      },
      status: {
        fetched: false
      }
    };
    this.getInitialPath = this.getInitialPath.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({status: nextProps.status});
    // response from Zootopia {"path":"/","contents":"","children":["zookeeper"]}
    if(nextProps.status.responseStatus === 200) {
      let children = [];
      if (nextProps.contents.children) {
        let arr = nextProps.contents.children;
        for (let i = 0; i < arr.length; i++){
          children.push({
            name: arr[i],
            collapsed: true,
            checkedHasChildren: false
          });
        }
      }
      this.setState({
        data: {
          name: nextProps.contents.path,
          contents: nextProps.contents.contents,
          children: children
        }
      });
    } else {
      this.setState({data: {}});
    }
  }

  componentWillMount() {
    let params = convertToObject(window.location.search);
    let bri = window.location.pathname.replace(/^\/+/g, '');
    let fixedUrl = params.path.startsWith("/") ?
      params.path : "/" + params.path;
    this.setState({
      data: this.props.contents,
      status: this.props.status
    });

    this.getInitialPath(bri, fixedUrl);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tree</h1>
        </header>
        {(this.state.status.fetched ?
          (this.state.status.responseStatus === 200 ?
              <Tree data={this.state.data}
                    openNode={this.state.data.name}/>
                :
              <div>{this.state.status.message}</div>
          )
              :
            <div>Waiting for data</div>
        )}
      </div>
    );
  }

  getInitialPath = (resource, path) => {
    this.props.getInitialPathFoo(resource, path);
  };
}

ZkUi.prototypes = {
  getInitialPath: PropTypes.func.isRequired
};

export default ZkUi;
