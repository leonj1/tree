import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        // name, children[], active, expanded, icon, canEdit, canDelete
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
