import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Tree.css';

class Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    // name, children[], active, collapsed, icon, level, canEdit, canDelete
  }

  componentWillMount() {
    console.log("Level: " + this.props.level + " style: " + this.props.thestyle);
  }

  renderChildren() {
    if(!this.props.data.children) {
      return;
    }
    return this.props.data.children.map((c) =>
      <Branch key={c.name} data={c} thestyle={this.props.thestyle} level={this.props.level + 1}/>
    );
  };

  render() {
    return (
      <div>
        <div className={this.props.thestyle}>> {this.props.level} {this.props.data.name}</div>
        {this.renderChildren()}
      </div>
    );
  }
}

Branch.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  thestyle: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired
};

export default Branch;
