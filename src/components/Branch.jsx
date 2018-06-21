import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    // name, children[], active, collapsed, icon, level, canEdit, canDelete
  }

  render() {
    return (
      <div>
        <div>Branch: {this.props.data.name}</div>
      </div>
    );
  }
}

Branch.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default Branch;
