import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import TaskEdit from '../TaskEdit/TaskEdit';

const Task = (props) => {
  let { minutesTimer, secondsTimer } = props;
  minutesTimer = Number(minutesTimer);
  secondsTimer = Number(secondsTimer);
  const { time } = props;
  const [timerId, setTimerId] = useState(null);
  const [timer, setTimer] = useState({ minutes: minutesTimer, seconds: secondsTimer });
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(time, { includeSeconds: true }));

  let updatedMinutes = Number(timer.minutes);
  let updatedSeconds = Number(timer.seconds);

  const getTime = () => {
    setTimeAgo(() => formatDistanceToNow(time, { includeSeconds: true }));
  };

  useEffect(() => {
    const { updateInterval } = props;
    const intervalId = setInterval(() => getTime(), updateInterval);
    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerId]);

  const updateTimer = () => {
    if (updatedSeconds !== 0) {
      updatedSeconds -= 1;
    } else if (updatedSeconds === 0 && updatedMinutes !== 0) {
      updatedSeconds = 59;
      updatedMinutes -= 1;
    } else {
      clearInterval(timerId);
    }

    return setTimer({ minutes: updatedMinutes, seconds: updatedSeconds });
  };

  const startTimer = () => {
    setTimerId(setInterval(updateTimer, 1000));
  };

  const pauseTimer = () => {
    clearInterval(timerId);
  };

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
  } = props;

  const clazz = classNames({ completed: completed, editing: editing });

  return (
    <li key={id} className={clazz}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
        <label>
          <span className="title">{label}</span>
          <span className="description">
            <button type="button" className="icon icon-play" aria-label="play" onClick={startTimer} />
            <button type="button" className="icon icon-pause" aria-label="pause" onClick={pauseTimer} />
            <p>
              {timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}:
              {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
            </p>
          </span>
          <span className="created">created {timeAgo} ago</span>
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
      {editing ? (
        <TaskEdit onEscPress={onEscPress} onBlur={() => onBlur(id)} onEdit={onEdit} label={label} id={id} />
      ) : null}
    </li>
  );
};

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

export default Task;
