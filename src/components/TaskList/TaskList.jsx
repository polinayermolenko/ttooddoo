import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';

const TaskList = ({ todos, onDeleted, onEdit, onBlur, onToggleCompleted, onToggleEditing }) => {
  const elements = todos.map((item) => {
    const { id } = item;
    return (
      <Task
        key={id}
        {...item}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onToggleEditing={() => onToggleEditing(id)}
        onEdit={onEdit}
        onBlur={onBlur}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onEdit: () => {},
  onBlur: () => {},
  onToggleCompleted: () => {},
  onToggleEditing: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onBlur: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onToggleEditing: PropTypes.func,
};

export default TaskList;
