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
      style: "tree-branch",
      collapsed: true
    };
    // name, children[], active, collapsed, icon, canEdit, canDelete
    // onChange
    // linkable ZK paths /engines/solr/foo
    this.clickToExpand = this.clickToExpand.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  componentWillMount() {
    this.setState({collapsed: this.props.contents.collapsed});
  }

  renderChildren() {
    if(!this.props.contents.children || this.state.collapsed) {
      return;
    }
    return this.props.contents.children.map((c) =>
      <Branch key={c.name}
              data={c}
              thestyle={this.state.style}
              level={this.state.level + 1}/>
    );
  };

  render() {
    return (
      <div className="tree-branch">
        <div onClick={this.clickToExpand}
             onMouseOver={this.onMouseOver}>
          {this.props.contents.name}
        </div>
        {this.renderChildren()}
      </div>
    );
  }

  clickToExpand = function() {
    this.setState({collapsed: !this.state.collapsed})
  };

  onMouseOver = function() {

  }
}

Tree.propTypes = {
  contents: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default Tree;
