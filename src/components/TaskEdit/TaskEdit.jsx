import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskEdit = (props) => {
  const { label } = props;
  const [labelEdit, setLabelEdit] = useState(label);

  const onLabelChange = (evt) => {
    setLabelEdit(evt.target.value);
  };

  const handleKeyPress = (evt) => {
    const { onEdit, onEscPress, id } = props;
    if (evt.key === 'Enter') {
      onEdit(id, labelEdit);
    }
    if (evt.key === 'Escape') {
      onEscPress(evt);
    }
  };

  const { onBlur } = props;

  return (
    <input
      type="text"
      className="edit"
      onChange={onLabelChange}
      value={labelEdit}
      onKeyDown={handleKeyPress}
      onBlur={onBlur}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
    />
  );
};

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

export default TaskEdit;
