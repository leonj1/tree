import React, { Component } from 'react';

class Branch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        // name, children[], active, expanded, icon, level, canEdit, canDelete
    }

    render() {
        return (
            <div>branch</div>
        );
    }
}

export default Branch;
