import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Tree.css';

class Branch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      componentType: "sibling",
      collapsed: false
    };
    // name, children[], active, collapsed, icon, level, canEdit, canDelete
    this.onMouseOver = this.onMouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.clickToExpand = this.clickToExpand.bind(this);
  }

  componentWillMount() {
    this.setState({collapsed: this.props.data.collapsed});
    console.log("WillMount collapsed props value: " + this.props.data.collapsed);
    console.log("WillMount collapsed state value: " + this.state.collapsed);
  }

  renderChildren() {
    if(!this.props.data.children || this.state.collapsed) {
      return;
    }
    return this.props.data.children.map((c) =>
      <Branch key={c.name}
              data={c}
              thestyle={this.props.thestyle}
              level={this.props.level + 1}/>
    );
  };

  render() {
    return (
      <div>
        <div className={this.props.thestyle + " " + this.state.componentType}
             style={{paddingLeft: this.props.level * 15}}
             onMouseOver={this.onMouseOver}
             onMouseLeave={this.mouseOut}
             onClick={this.clickToExpand}>
          > {this.props.level} {this.props.data.name}
          </div>
        {this.renderChildren()}
      </div>
    );
  }

  onMouseOver = function() {
    this.setState({componentType: "current"});
  };

  mouseOut = function() {
    this.setState({componentType: "sibling"});
  };

  clickToExpand = function() {
    console.log("ClickToExpand collapsed: " + this.state.collapsed);
    this.setState({collapsed: !this.state.collapsed})
  };

}

Branch.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  thestyle: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired
};

export default Branch;
