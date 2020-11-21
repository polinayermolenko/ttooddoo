import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    completed: false,
    editing: false,
  };

  onLabelClick = () => {
    this.setState(({ completed }) => ({ completed: !completed }));
  };

  onEdit = () => {
    this.setState(({ editing }) => ({ editing: !editing }));
  };

  render() {
    const { id, onDeleted } = this.props;

    const {
      // eslint-disable-next-line react/prop-types
      item: { label, time },
    } = this.props;
    const { completed, editing } = this.state;

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
          <input className="toggle" type="checkbox" onClick={this.onLabelClick} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{time}</span>
          </label>
          <button type="button" aria-label="Edit Task" className="icon icon-edit" onClick={this.onEdit} />
          <button type="button" aria-label="Delete Task" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input type="text" className="edit" /* value="Editing task" */ />
      </li>
    );
  }
}

Task.defaultProps = {
  onDeleted: () => {},
};

Task.propTypes = {
  onDeleted: PropTypes.func,
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
};
