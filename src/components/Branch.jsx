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
      showEditButtons: false,
      fullPath: ""
    };
    // name, children[], active, collapsed, icon, level, canEdit, canDelete
    this.onMouseOver = this.onMouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
    this.clicked = this.clicked.bind(this);
    this.renameNode = this.renameNode.bind(this);
    this.deletingNode = this.deletingNode.bind(this);
  }

  componentWillMount() {
    let _startOfFullPath = (this.props.parent === "//" ? "" : this.props.parent),
      shouldBeCollapsed = true;
    if (this.props.openNode && this.props.data.name !== "/") {
      let tmpArray = this.props.openNode.split("/");
      let tokenToCompare = tmpArray[this.props.level - 1];
      if (tokenToCompare === this.props.data.name) {
        shouldBeCollapsed = false;
      }
    } else {
      shouldBeCollapsed = this.props.data.collapsed;
    }
    // console.log(this.props.data.name + " shouldBeCollapsed: " + shouldBeCollapsed);
    this.setState({
      collapsed: shouldBeCollapsed,
      fullPath: _startOfFullPath + "/" + this.props.data.name
    });
  }

  renderChildren() {
    if (!this.props.data.children || this.state.collapsed) {
      return;
    }
    return this.props.data.children.map((c) =>
      <Branch key={c.name}
              parent={this.state.fullPath}
              data={c}
              openNode={this.props.openNode}
              thestyle={this.props.thestyle}
              level={this.props.level + 1}
              clicked={this.props.clicked}
              onDelete={this.deletingNode}/>
    );
  };

  renderLoading() {
    if (!this.state.collapsed && this.props.data.loading) {
      let loading = {
        name: "Loading"
      };
      return <Branch key="loading"
                     parent=""
                     data={loading}
                     openNode={this.props.openNode}
                     thestyle={this.props.thestyle}
                     level={this.props.level + 1}
                     clicked={this.props.clicked}
                     onDelete={this.deletingNode}/>
    }
  }

  renderExpandChildrenPlaceholder() {
    if (this.props.data.checkedHasChildren && this.props.data.children) {
      return this.state.collapsed ? "▶" : "▼";
    }
    if (!this.props.data.checkedHasChildren && this.props.data.name !== "Loading") {
      return "*";
    }
  }

  render() {
    const folderIndentation = 6;

    return (
      <div>
        {this.props.data.name === 'Loading' ? (
          <div className={this.props.thestyle + " loading"}
               style={{paddingLeft: this.props.level * folderIndentation}}>
            Loading
          </div>
        ) : (
          <div className={this.props.thestyle + " " + this.state.componentType}
               style={{paddingLeft: this.props.level * folderIndentation}}>
            <div onMouseOver={this.onMouseOver}
                 onMouseLeave={this.mouseOut}
                 onClick={() => this.clicked(this.state.fullPath)}
                 className="zk-node-container">
              <div className="zk-node-left-pane">
                <span className="zk-node-expand-icon">{this.renderExpandChildrenPlaceholder()}</span>
                <span className="zk-node-foldername">{this.props.data.name}</span>
              </div>
              <div
                className={(this.state.showEditButtons) ? ("zk-node-right-pane zk-node-edit-buttons-show") : ("zk-node-right-pane zk-node-edit-buttons-hide")}>
                <div className="zk-node-buttons">
                <span className="zk-node-edit-button"
                      onClick={() => this.renameNode(this.state.fullPath)}>
                  rename
                </span>
                  <span className="zk-node-delete-button"
                        onClick={() => this.deletingNode(this.state.fullPath)}>
                  delete
                </span>
                </div>
              </div>
            </div>
            {this.renderLoading()}
            {this.renderChildren()}
          </div>
        )}
      </div>
    );
  }

  renameNode = function (path) {
    console.log("Clicked rename: " + path);
  };

  deletingNode = function (path) {
    console.log("Clicked delete: " + path);
  };

  onMouseOver = function () {
    this.setState({componentType: "current"});
    if (!this.props.data.checkedHasChildren) {
      this.setState({showEditButtons: false});
      return;
    }
    if (this.props.data.children) {
      if (this.props.data.children.length > 0) {
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

  clicked = function (path) {
    this.props.clicked(path);
    this.setState({collapsed: !this.state.collapsed})
  };

}

Branch.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  thestyle: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  parent: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  openNode: PropTypes.string
};

export default Branch;
