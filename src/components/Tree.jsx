import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Branch from './Branch';

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

  foo() {
    // var i, result = [];
    // for (i = 0; i < children.length; i++) {
    //   console.log("Creating Branch:" + children[i].name);
    //   result.push(<Branch data={children[i]}/>);
    // }
    // return result;
    const children = this.props.contents.children.map((c) =>
      <Branch key={c.name} data={c}/>
    );
    return children;
  };

  render() {
    return (
      <div>
        <div>{this.props.contents.name}</div>
        <div>{this.props.contents.foo}</div>
        <div>Toggled: {this.props.contents.toggled.toString()}</div>
        <div>Active: {this.props.contents.active.toString()}</div>
        Foobar: {this.foo()}
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
