import React, { Component } from 'react';
import Tree from './components/Tree';

const convertToObject = (url) => {
  const arr = url.slice(1).split(/&|=/); // remove the "?", "&" and "="
  let params = {};

  for(let i = 0; i < arr.length; i += 2){
    const key = arr[i], value = arr[i + 1];
    params[key] = value ; // build the object = { limit: "10", page:"1", status:"APPROVED" }
  }
  return params;
};

// const uri = this.props.location.search; // "?status=APPROVED&page=1&limit=20"
//
// const obj = convertToObject(uri);
//
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
      }
    }
  }

  componentWillMount() {
    console.log(window.location);
    console.log(window.location.search);
    let params = convertToObject(window.location.search);
    console.log(params.path);
    console.log(this.props);
    var bri = window.location.pathname.replace(/^\/+/g, '');
    console.log("resource:" + bri);
    let fixedUrl = params.path.startsWith("/") ?
      params.path : "/" + params.path;
    this.setState({
      data: {
        name: fixedUrl
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tree</h1>
        </header>
        <Tree data={this.state.data}
              openNode={this.state.data.name}/>
      </div>
    );
  }

}

export default ZkUi
