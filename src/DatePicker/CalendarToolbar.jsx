import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTime from '../utils/DateTime';
import IconButton from '../Button/IconButton';
import NavigationChevronLeft from '../svg-icons/navigation-chevron-left';
import NavigationChevronRight from '../svg-icons/navigation-chevron-right';
import SlideInTransitionGroup from '../transition-groups/SlideIn';

class CalendarToolbar extends Component {
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call parent constructor
    super(props);

    this.state = {
      transitionDirection: 'up',
    };
  }

  componentWillReceiveProps(nextProps) {
    let direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }
  }

  _isDisabled = direction => {
    const date = this.props.displayDate;
    const minDate = this.props.minDate;
    const maxDate = this.props.maxDate;

    if (direction == 'left' && minDate) {
      if (date.getFullYear() < minDate.getFullYear()) return true;
      if (date.getFullYear() == minDate.getFullYear()) {
        return date.getMonth() <= minDate.getMonth();
      }
    } else if (direction == 'right' && maxDate) {
      if (date.getFullYear() > maxDate.getFullYear()) return true;
      if (date.getFullYear() == maxDate.getFullYear()) {
        return date.getMonth() >= maxDate.getMonth();
      }
    }

    return false;
  };

  render() {
    const month = DateTime.getFullMonth(this.props.displayDate);
    const year = this.props.displayDate.getFullYear();

    const disableLeft = this._isDisabled('left');
    const disableRight = this._isDisabled('right');

    return (
      <div className="chamel-date-picker-calendar-toolbar">
        <SlideInTransitionGroup
          className="chamel-date-picker-calendar-toolbar-title"
          direction={this.state.transitionDirection}
        >
          <div key={month + '_' + year}>
            {month} {year}
          </div>
        </SlideInTransitionGroup>

        <IconButton
          disabled={disableLeft}
          className="chamel-date-picker-calendar-toolbar-button-left"
          onClick={this.props.onLeftTouchTap}
        >
          <NavigationChevronLeft />
        </IconButton>

        <IconButton
          disabled={disableRight}
          className="chamel-date-picker-calendar-toolbar-button-right"
          onClick={this.props.onRightTouchTap}
        >
          <NavigationChevronRight />
        </IconButton>
      </div>
    );
  }
}

CalendarToolbar.propTypes = {
  displayDate: PropTypes.object.isRequired,
  onLeftTouchTap: PropTypes.func,
  onRightTouchTap: PropTypes.func,
  maxDate: PropTypes.object,
  minDate: PropTypes.object,
};

CalendarToolbar.defaultProps = {
  maxDate: null,
  minDate: null,
};

export default CalendarToolbar;
