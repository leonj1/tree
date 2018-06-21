import React, { Component } from 'react';
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

    render() {
        return (
            <div>
                <div>{this.props.contents.name}</div>
                <div>{this.props.contents.foo}</div>
                <div>Toggled: {this.props.contents.toggled.toString()}</div>
                <div>Active: {this.props.contents.active.toString()}</div>
                {this.props.contents.children.map(function(child, i){
                    return <Branch data={child}/>
                )}
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
