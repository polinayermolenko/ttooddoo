import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  onLabelChange = (evt) => {
    this.setState({
      label: evt.target.value,
    });
  };

  handleKeyPress = (evt) => {
    const { onAdded } = this.props;
    const { label } = this.state;
    if (evt.key === 'Enter') {
      onAdded(label);
      this.setState({
        label: '',
      });
    }
  };

  render() {
    const { label } = this.state;
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.onLabelChange}
        value={label}
        onKeyDown={this.handleKeyPress}
      />
    );
  }
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};
