import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import TaskEdit from '../TaskEdit/TaskEdit';

export default class Task extends Component {
  intervalId = null;

  timerId = null;

  constructor(props) {
    super(props);
    this.state = {
      time: props.time,
      interval: formatDistanceToNow(props.time, { includeSeconds: true }),
      minutesTimer: Number(props.minutesTimer),
      secondsTimer: Number(props.secondsTimer),
    };
  }

  componentDidMount() {
    const { updateInterval } = this.props;
    this.intervalId = setInterval(() => this.getTime(), updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.timerId);
  }

  getTime() {
    const { time } = this.state;
    this.setState(() => ({ interval: formatDistanceToNow(time, { includeSeconds: true }) }));
  }

  startTimer = () => {
    if (!this.timerId) {
      this.timerId = setInterval(this.updateTimer, 1000);
    }
  };

  updateTimer = () => {
    let { minutesTimer, secondsTimer } = this.state;
    if (secondsTimer) {
      secondsTimer -= 1;
    } else if (!secondsTimer && minutesTimer) {
      secondsTimer = 59;
      minutesTimer -= 1;
    } else {
      clearInterval(this.timerId);
    }

    this.setState(() => ({ minutesTimer, secondsTimer }));
  };

  pauseTimer = () => {
    clearInterval(this.timerId);
    this.timerId = null;
  };

  transformTimer = (value) => {
    let timerValue = value;

    if (timerValue < 10) {
      timerValue = `0${timerValue}`;
    }
    return timerValue;
  };

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
    let { minutesTimer, secondsTimer } = this.state;
    minutesTimer = this.transformTimer(minutesTimer);
    secondsTimer = this.transformTimer(secondsTimer);

    return (
      <li key={id} className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
          <label>
            <span className="title">{label}</span>
            <span className="description">
              <button type="button" className="icon icon-play" aria-label="play" onClick={this.startTimer} />
              <button type="button" className="icon icon-pause" aria-label="pause" onClick={this.pauseTimer} />
              <p>{`${minutesTimer}:${secondsTimer}`}</p>
            </span>
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
  minutesTimer: PropTypes.string.isRequired,
  secondsTimer: PropTypes.string.isRequired,
};
