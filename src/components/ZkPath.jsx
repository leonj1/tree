import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Tree.css';
import Branch from "./Branch";

class ZkPath extends Component {

  render() {
    return (
      <div className="zk-path-container">
        <span className="zk-path-label">
          Path:
        </span>
        <span className="zk-path">
          <input className="zk-path-input" type="text" placeholder="ZK path" value={this.props.path}/>
        </span>
      </div>
    );
  }
}

Branch.propTypes = {
  path: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired
};

export default ZkPath;
