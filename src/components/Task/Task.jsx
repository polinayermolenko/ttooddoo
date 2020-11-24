import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import TaskEdit from '../TaskEdit/TaskEdit';

export default class Task extends Component {
  intervalId = null;

  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      interval: formatDistanceToNow(props.time, { includeSeconds: true }),
    };
  }

  componentDidMount() {
    const { updateInterval } = this.props;
    this.intervalId = setInterval(() => this.getTime(), updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getTime() {
    const { time } = this.state;
    this.setState(() => ({ interval: formatDistanceToNow(time, { includeSeconds: true }) }));
  }

  render() {
    const {
      id,
      onDeleted,
      onBlur,
      onEdit,
      onToggleCompleted,
      onToggleEditing,
      onEscPress,
      label,
      editing,
      completed,
    } = this.props;

    const { interval } = this.state;

    return (
      <li key={id} className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {interval} ago</span>
          </label>
          <button
            type="button"
            aria-label="Edit Task"
            className={`${completed ? 'icon icon-edit icon-edit-disabled' : 'icon icon-edit'}`}
            onClick={onToggleEditing}
            disabled={completed}
          />
          <button type="button" aria-label="Delete Task" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {editing ? <TaskEdit onEscPress={onEscPress} onBlur={onBlur} onEdit={onEdit} label={label} id={id} /> : null}
      </li>
    );
  }
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  onEdit: () => {},
  onBlur: () => {},
  onEscPress: () => {},
  updateInterval: 5000,
};

Task.propTypes = {
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onBlur: PropTypes.func,
  onEscPress: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  editing: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  updateInterval: PropTypes.number,
  time: PropTypes.instanceOf(Date).isRequired,
};
