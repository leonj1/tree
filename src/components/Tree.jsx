import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Branch from './Branch';
import ZkPath from './ZkPath';
import './Tree.css';

class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullPath: "/"
    };
    this.branchClicked = this.branchClicked.bind(this);
    this.onPathChange = this.onPathChange.bind(this);
  }

  componentWillMount() {
    this.setState({fullPath: this.props.openNode});
  }

  render() {
    const fullPath = this.state.fullPath;
    const data = this.props.data;
    console.log("Tree openNode: " + fullPath);

    return (
      <div>
        <div>
          <ZkPath path={fullPath}
                  onPathChange={this.onPathChange}/>
        </div>
        <div className="app-container">
          <div className="app-left-pane">
            <Branch key="root"
                    parent=""
                    openNode={fullPath}
                    clicked={this.branchClicked}
                    data={data}
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

  branchClicked = function(path) {
    if(path === "//") {
      path = "/";
    }
    console.log("branchClicked: " + path);
    this.setState({fullPath: path});
  };


  onPathChange = function(e) {
    // console.log("fullPath after: " + e.target.value);
    this.setState({fullPath: String(e.target.value)});
  }
}

Tree.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  openNode: PropTypes.string
};

export default Tree;
