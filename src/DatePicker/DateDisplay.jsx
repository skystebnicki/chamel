import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Classable from '../mixins/classable';
import DateTime from '../utils/DateTime';
import SlideInTransitionGroup from '../transition-groups/SlideIn';

class DateDisplay extends Component {

  // mixins: [Classable],
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      transitionDirection: 'up'
    };
  }

  componentWillReceiveProps(nextProps) {
    let direction;

    if (nextProps.selectedDate !== this.props.selectedDate) {
      direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  }

  render() {
    let {
      selectedDate,
      ...other
    } = this.props;
    const classes = this.getClasses('chamel-date-picker-date-display');
    const dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    const month = DateTime.getShortMonth(this.props.selectedDate);
    const day = this.props.selectedDate.getDate();
    const year = this.props.selectedDate.getFullYear();

    return (
      <div {...other} className={classes}>

        <SlideInTransitionGroup
          className="chamel-date-picker-date-display-dow"
          direction={this.state.transitionDirection}>
          <div key={dayOfWeek}>{dayOfWeek}</div>
        </SlideInTransitionGroup>

        <div className="chamel-date-picker-date-display-date">

          <SlideInTransitionGroup
            className="chamel-date-picker-date-display-month"
            direction={this.state.transitionDirection}>
            <div key={month}>{month}</div>
          </SlideInTransitionGroup>

          <SlideInTransitionGroup
            className="chamel-date-picker-date-display-day"
            direction={this.state.transitionDirection}>
            <div key={day}>{day}</div>
          </SlideInTransitionGroup>

          <SlideInTransitionGroup
            className="chamel-date-picker-date-display-year"
            direction={this.state.transitionDirection}>
            <div key={year}>{year}</div>
          </SlideInTransitionGroup>

        </div>

      </div>
    );
  }

};

DateDisplay.propTypes = {
  selectedDate: PropTypes.object.isRequired
};

// Check for commonjs
if (module) {
  module.exports = DateDisplay;
}

export default DateDisplay;
