import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    labelEdit: this.props.label,
  };

  onLabelChange = (evt) => {
    this.setState({
      labelEdit: evt.target.value,
    });
  };

  handleKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onEdit(this.props.id, this.state.labelEdit);
    }
  };

  render() {
    const { id, onDeleted, onToggleCompleted, onToggleEditing, label, time, editing, completed } = this.props;

    let classNames = '';
    if (completed) {
      classNames += 'completed';
    }

    if (editing) {
      classNames += 'editing';
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{time}</span>
          </label>
          <button type="button" aria-label="Edit Task" className="icon icon-edit" onClick={onToggleEditing} />
          <button type="button" aria-label="Delete Task" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          onChange={this.onLabelChange}
          // eslint-disable-next-line react/destructuring-assignment
          value={this.state.labelEdit}
          onKeyDown={this.handleKeyPress}
        />
      </li>
    );
  }
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  editing: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
};
