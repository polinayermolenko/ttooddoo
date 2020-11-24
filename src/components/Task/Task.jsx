import React from 'react';
import PropTypes from 'prop-types';
import TaskEdit from '../TaskEdit/TaskEdit';
import TaskDate from '../TaskDate/TaskDate';

const Task = ({
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
  time,
}) => {
  return (
    <li key={id} className={`${completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} defaultChecked={completed} />
        <label>
          <span className="description">{label}</span>
          <TaskDate time={time} />
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
};

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
  onEdit: () => {},
  onBlur: () => {},
  onEscPress: () => {},
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
  time: PropTypes.instanceOf(Date).isRequired,
};

export default Task;
