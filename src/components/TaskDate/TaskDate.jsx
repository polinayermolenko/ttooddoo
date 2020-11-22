import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class TaskDate extends Component {
  intervalId = null;

  constructor(props) {
    super(props);
    this.state = {
      time: props,
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
    // eslint-disable-next-line react/destructuring-assignment
    const { time } = this.state.time;
    this.setState(() => ({ interval: formatDistanceToNow(time, { includeSeconds: true }) }));
  }

  render() {
    const { interval } = this.state;
    return <span className="created">created {interval} ago</span>;
  }
}

TaskDate.defaultProps = {
  updateInterval: 5000,
};

TaskDate.propTypes = {
  updateInterval: PropTypes.number,
  time: PropTypes.instanceOf(Date).isRequired,
};
