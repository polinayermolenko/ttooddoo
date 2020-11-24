import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelEdit: props.label,
    };
  }

  onLabelChange = (evt) => {
    this.setState({
      labelEdit: evt.target.value,
    });
  };

  handleKeyPress = (evt) => {
    const { onEdit, onEscPress, id } = this.props;
    const { labelEdit } = this.state;
    if (evt.key === 'Enter') {
      onEdit(id, labelEdit);
    }
    if (evt.key === 'Escape') {
      onEscPress(evt);
    }
  };

  onBlur = () => {
    const { onBlur, id } = this.props;
    onBlur(id);
  };

  render() {
    const { labelEdit } = this.state;
    return (
      <input
        type="text"
        className="edit"
        onChange={this.onLabelChange}
        value={labelEdit}
        onKeyDown={this.handleKeyPress}
        onBlur={this.onBlur}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
    );
  }
}

TaskEdit.defaultProps = {
  onBlur: () => {},
  onEdit: () => {},
  onEscPress: () => {},
};

TaskEdit.propTypes = {
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onEdit: PropTypes.func,
  onEscPress: PropTypes.func,
  id: PropTypes.number.isRequired,
};
