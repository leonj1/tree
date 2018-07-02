import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EditableLabel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      text: ''
    }
  };

  componentWillMount() {
    this.setState({text: this.props.value});
  }

  render() {
    if (this.state.editing)
      return <input ref='textInput'
                    type='text'
                    onChange={this.textChanged}
                    onBlur={this.inputLostFocus}
                    onKeyPress={this.keyPressed}
                    value={this.state.text}
                    autoFocus
                    className="zk-editable-label-rw"
      />;

    return <div className="zk-editable-label-ro">{this.state.text}</div>;
  }

  textChanged() {
    this.setState({text: this.refs.textInput.value});
  };

  inputLostFocus() {
    this.props.finishedEditing(this.state.text);
    // this.setState({editing: false});
  };

  keyPressed(event) {
    if (event.key === 'Enter') {
      this.inputLostFocus();
    }
  };
}

EditableLabel.propTypes = {
  value: PropTypes.string.isRequired,
  enableEditing: PropTypes.bool.isRequired,
  finishedEditing: PropTypes.func.isRequired
};

export default EditableLabel;
