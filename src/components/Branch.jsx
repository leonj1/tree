import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Tree.css';

class Branch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      componentType: "sibling",
      collapsed: false,
      showEditButtons: false
    };
    // name, children[], active, collapsed, icon, level, canEdit, canDelete
    this.onMouseOver = this.onMouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.clickToExpand = this.clickToExpand.bind(this);
    this.editingNode = this.editingNode.bind(this);
    this.deletingNode = this.deletingNode.bind(this);
  }

  componentWillMount() {
    // var should = false;
    // if(!this.props.data.children) {
    //   should = true;
    // }
    this.setState({collapsed: this.props.data.collapsed});
  }

  renderChildren() {
    if (!this.props.data.children || this.state.collapsed) {
      return;
    }
    return this.props.data.children.map((c) =>
      <Branch key={c.name}
              data={c}
              thestyle={this.props.thestyle}
              level={this.props.level + 1}/>
    );
  };

  renderLoading() {
    if (!this.state.collapsed && this.props.data.loading) {
      var loading = {
        name: "Loading"
      };
      return <Branch key="loading"
                     data={loading}
                     thestyle={this.props.thestyle}
                     level={this.props.level + 1}/>
    }
  }

  renderExpandChildrenPlaceholder() {
    if (this.props.data.checkedHasChildren && this.props.data.children) {
      return this.state.collapsed ? "+" : "-";
    }
    if (!this.props.data.checkedHasChildren && this.props.data.name !== "Loading") {
      return ">";
    }
  }

  render() {
    return (
      <div>
        <div className={(this.props.data.loading ? "loading" : this.props.thestyle) + " " + this.state.componentType}
             style={{paddingLeft: this.props.level * 15}}>
          <div onMouseOver={this.onMouseOver}
               onMouseLeave={this.mouseOut}
               onClick={this.clickToExpand}
               className="zk-node-container">
            <div className="zk-node-left-pane">
              {this.renderExpandChildrenPlaceholder()}
              {this.props.data.name}
            </div>
            <div
              className={(this.state.showEditButtons) ? ("zk-node-right-pane zk-node-edit-buttons-show") : ("zk-node-right-pane zk-node-edit-buttons-hide")}>
              <div className="zk-node-buttons">
                <span className="zk-node-edit-button"
                      onClick={this.editingNode}>
                  edit
                </span>
                <span className="zk-node-delete-button"
                      onClick={this.deletingNode}>
                  delete
                </span>
              </div>
            </div>
          </div>
          {this.renderLoading()}
          {this.renderChildren()}
        </div>
      </div>
    );
  }

  editingNode = function () {
    console.log("Clicked edit");
  };

  deletingNode = function () {
    console.log("Clicked delete");
  };

  onMouseOver = function () {
    this.setState({componentType: "current"});
    if (!this.props.data.checkedHasChildren) {
      console.log("Not showing edit buttons since we have not checked if there are child nodes");
      this.setState({showEditButtons: false});
      return;
    }
    if (this.props.data.children) {
      if (this.props.data.children.length > 0) {
        console.log("Not showing edit buttons since this node has children");
        this.setState({showEditButtons: false});
        return;
      }
    }
    this.setState({showEditButtons: true});
  };

  mouseOut = function () {
    this.setState({
      componentType: "sibling",
      showEditButtons: false
    });
  };

  clickToExpand = function () {
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
