import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Tree.css';

class ZkPath extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullPath: ""
    };
    this.pathManuallyTyped = this.pathManuallyTyped.bind(this);
  }

  componentWillMount() {
    console.log("Setting path to: " + this.props.path);
    this.setState({ fullPath: this.props.path});
  }

  render() {
    return (
      <div className="zk-path-container">
        <span className="zk-path-label">
          Path:
        </span>
        <span className="zk-path">
            <input className="zk-path-input"
                   onKeyDown={(e) => this.props.onPathChange(e)}
                   onChange={(e) => this.pathManuallyTyped(e)}
                   type="text"
                   placeholder="ZK path"
                   value={this.state.fullPath}/>
        </span>
      </div>
    );
  }

  pathManuallyTyped = function(e) {
    this.setState({fullPath: e.target.value});
  }
}

ZkPath.propTypes = {
  path: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  onPathChange: PropTypes.func
};

export default ZkPath;
