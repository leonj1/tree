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
    this.handleStuff = this.handleStuff.bind(this);
  }

  componentWillMount() {
    // this.setState({fullPath: this.props.openNode});
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.openNode + ":" + this.props.openNode);
    // this.handleStuff();
    let tmpArray = this.props.openNode.split("/");
    let tokenToCompare = tmpArray[this.props.level - 1];
    if (tokenToCompare === this.props.data.name) {
      this.setState({collapsed: false});
    }
  }

  componentDidMount() {
    this.handleStuff();
  }

  handleStuff = function() {
    let _startOfFullPath = (this.props.parent === "//" ? "" : this.props.parent),
      shouldBeCollapsed = true;
    // console.log(this.props.level + ":" + this.props.data.name + ":" + this.props.parent + ":" + this.props.openNode);
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
  };

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
    const style = this.props.thestyle;
    const componentType = this.state.componentType;
    const level = this.props.level;
    const fullPath = this.state.fullPath;
    const name = this.props.data.name;
    const showEditButtons = this.state.showEditButtons;

    return (
      <div>
        {this.props.data.name === 'Loading' ? (
          <div className={style + " loading"}
               style={{paddingLeft: level * folderIndentation}}>
            Loading
          </div>
        ) : (
          <div className={style + " " + componentType}
               style={{paddingLeft: level * folderIndentation}}>
            <div onMouseOver={this.onMouseOver}
                 onMouseLeave={this.mouseOut}
                 onClick={() => this.clicked(fullPath)}
                 className="zk-node-container">
              <div className="zk-node-left-pane">
                <span className="zk-node-expand-icon">{this.renderExpandChildrenPlaceholder()}</span>
                <span className="zk-node-foldername">{name}</span>
              </div>
              <div
                className={(showEditButtons) ? ("zk-node-right-pane zk-node-edit-buttons-show") : ("zk-node-right-pane zk-node-edit-buttons-hide")}>
                <div className="zk-node-buttons">
                <span className="zk-node-edit-button"
                      onClick={() => this.renameNode(fullPath)}>
                  rename
                </span>
                  <span className="zk-node-delete-button"
                        onClick={() => this.deletingNode(fullPath)}>
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
    console.log("Clicked: " + path);
    this.setState({collapsed: !this.state.collapsed});
    this.props.clicked(path);
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
