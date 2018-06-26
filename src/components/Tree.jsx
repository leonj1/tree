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
    this.branchClicked = this.branchClicked.bind(this)
  }

  componentWillMount() {
    this.setState({fullPath: this.props.openNode})
  }

  render() {
    return (
      <div>
        <div>
          <ZkPath path={this.state.fullPath}
                  edit={this.branchClicked}/>
        </div>
        <div className="app-container">
          <div className="app-left-pane">
            <Branch key="root"
                    parent=""
                    openNode={this.props.openNode}
                    clicked={this.branchClicked}
                    data={this.props.data}
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
    this.setState({fullPath: path});
  }

}

Tree.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  openNode: PropTypes.string
};

export default Tree;
