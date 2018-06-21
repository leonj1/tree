import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Branch from './Branch';
import './Tree.css';

class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    // name, children[], active, collapsed, icon, canEdit, canDelete
    // onChange
    // linkable ZK paths /engines/solr/foo
  }

  renderChildren() {
    if(!this.props.contents.children) {
      return;
    }
    return this.props.contents.children.map((c) =>
      <Branch key={c.name} data={c} className="tree-branch"/>
    );
  };

  render() {
    return (
      <div>
        <div>{this.props.contents.name}</div>
        <div>{this.props.contents.renderChildren}</div>
        <div>Toggled: {this.props.contents.toggled.toString()}</div>
        <div>Active: {this.props.contents.active.toString()}</div>
        {this.renderChildren()}
      </div>
    );
  }
}

Tree.propTypes = {
  contents: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default Tree;
