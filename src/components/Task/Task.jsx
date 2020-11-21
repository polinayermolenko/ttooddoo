import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const Task = ({ item: { label, time, editing, completed }, id, onDeleted, onToggleCompleted, onToggleEditing }) => {
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
      <input type="text" className="edit" /* value="Editing task" */ />
    </li>
  );
};

Task.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
};

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
};

export default Task;
