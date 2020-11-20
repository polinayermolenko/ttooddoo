import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    completed: false,
  };

  onLabelClick = () => {
    this.setState({
      completed: true,
    });
  };

  render() {
    const { id } = this.props;

    // eslint-disable-next-line react/prop-types
    const {
      item: { label, time },
    } = this.props;
    const { completed } = this.state;

    let classNames = '';
    if (completed) {
      classNames += 'completed';
    }

    return (
      <li key={id} className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={this.onLabelClick} />
          <label>
            <span className="description">{label}</span>
            <span className="created">{time}</span>
          </label>
          <button type="button" aria-label="Edit Task" className="icon icon-edit" />
          <button type="button" aria-label="Delete Task" className="icon icon-destroy" />
        </div>
      </li>
    );
  }
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
};
