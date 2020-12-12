import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_TIMER = '00';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  checkTimerFormat = (value, inputId) => {
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

  onLabelChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  onMinutesChange = (evt) => {
    this.setState({ minutes: this.checkTimerFormat(evt.target.value, evt.target.id) });
  };

  onSecondsChange = (evt) => {
    this.setState({ seconds: this.checkTimerFormat(evt.target.value, evt.target.id) });
  };

  handleKeyPress = (evt) => {
    const { onAdded } = this.props;
    const { label } = this.state;
    let { minutes, seconds } = this.state;

    if (evt.key === 'Enter') {
      onAdded(label, (minutes = minutes || DEFAULT_TIMER), (seconds = seconds || DEFAULT_TIMER));
      this.setState({
        label: '',
        minutes: '',
        seconds: '',
      });
    }
  };

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form">
        <input
          id="text"
          className="new-todo"
          placeholder="What needs to be done?"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={this.onLabelChange}
          onKeyDown={this.handleKeyPress}
          value={label}
        />
        <input
          id="minutes"
          className="new-todo-form__timer"
          placeholder="Min"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={this.onMinutesChange}
          value={minutes}
        />
        <input
          id="seconds"
          className="new-todo-form__timer"
          placeholder="Sec"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={this.onSecondsChange}
          value={seconds}
        />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onAdded: () => {},
};

NewTaskForm.propTypes = {
  onAdded: PropTypes.func,
};
