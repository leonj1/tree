import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            <div>{this.props.contents.name}</div>
        );
    }
}

Tree.propTypes = {
    contents: PropTypes.string.isRequired
};

export default Tree;
