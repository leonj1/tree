import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Tree.css';

class ZkPath extends Component {

  render() {
    const fullPath = this.props.path;

    return (
      <div className="zk-path-container">
        <span className="zk-path-label">
          Path:
        </span>
        <span className="zk-path">
            <input className="zk-path-input"
                   onChange={(e) => this.props.onPathChange(e)}
                   type="text"
                   placeholder="ZK path"
                   value={fullPath}/>
        </span>
      </div>
    );
  }

}

ZkPath.propTypes = {
  path: PropTypes.string.isRequired,
  onPathChange: PropTypes.func
};

export default ZkPath;
