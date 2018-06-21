import React, { Component } from 'react';

class Leaf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        // name, active, icon
    }

    render() {
        return (
            <div>Leaf</div>
        );
    }
}

export default Leaf;
