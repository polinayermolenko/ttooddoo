import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_TIMER = '00';

const NewTaskForm = (props) => {
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const checkTimerFormat = (value, inputId) => {
    let timerValue = null;

    if (Number.isNaN(Number(value))) {
      timerValue = '';
    } else if (inputId === 'seconds' && Number(value) > 59) {
      timerValue = '';
    } else {
      timerValue = value;
    }

    return timerValue;
  };

  const onLabelChange = (evt) => {
    setLabel(evt.target.value);
  };

  const onMinutesChange = (evt) => {
    setMinutes(checkTimerFormat(evt.target.value, evt.target.id));
  };

  const onSecondsChange = (evt) => {
    setSeconds(checkTimerFormat(evt.target.value, evt.target.id));
  };

  const handleKeyPress = (evt) => {
    const { onAdded } = props;
    if (evt.key === 'Enter') {
      onAdded(label, minutes || DEFAULT_TIMER, seconds || DEFAULT_TIMER);
      setLabel('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <form className="new-todo-form">
      <input
        id="text"
        className="new-todo"
        placeholder="What needs to be done?"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        onChange={onLabelChange}
        onKeyDown={handleKeyPress}
        value={label}
      />
      <input
        id="minutes"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinutesChange}
        value={minutes}
      />
      <input
        id="seconds"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecondsChange}
        value={seconds}
      />
    </form>
  );
};

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};

export default NewTaskForm;
