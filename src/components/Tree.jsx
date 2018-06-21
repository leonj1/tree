import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Branch from './Branch';
import './Tree.css';

class Tree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      level: 1,
      style: "tree-branch"
    };
    // name, children[], active, collapsed, icon, canEdit, canDelete
    // onChange
    // linkable ZK paths /engines/solr/foo
  }

  componentWillMount() {
    console.log("Tree style passing along: " + this.state.style);
  }

  renderChildren() {
    if(!this.props.contents.children || this.props.contents.collapsed) {
      return;
    }
    return this.props.contents.children.map((c) =>
      <Branch key={c.name} data={c} thestyle={this.state.style} level={this.state.level + 1}/>
    );
  };

  render() {
    return (
      <div className="tree-branch">
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
