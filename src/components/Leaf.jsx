import React, { Component } from 'react';

class Leaf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            leaf: true
        };
        // name, active, icon
        // leaf = true Otherwise how can we tell what the child is?
    }

    render() {
        return (
            <div>Leaf</div>
        );
    }
}

export default Leaf;
