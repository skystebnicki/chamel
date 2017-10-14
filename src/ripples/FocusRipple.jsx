import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import ThemeService from '../styles/ChamelThemeService';

class FocusRipple extends Component {

  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
      // Call paprent constructor
      super(props);
  }

  componentDidMount() {
    this.setRippleSize();
  }

  render() {
    let theme = (this.context.chamelTheme && this.context.chamelTheme.ripple)
        ? this.context.chamelTheme.ripple : ThemeService.defaultTheme.ripple;

    let classes = classnames(theme.rippleFocus, {
      [theme.rippleShown]: this.props.show
    });

    return (
      <div className={classes}>
        <div className={theme.rippleFocusInner} />
      </div>
    );
  }

  /**
   * Try and determine the size of the ripple based on the size of this dom element
   */
  setRippleSize() {
    let el = ReactDOM.findDOMNode(this);
    const height = el.offsetHeight;
    const width = el.offsetWidth;
    const size = Math.max(height, width);

    // If element is mounted then set the size
    if (el.style) {
      el.style.height = size + 'px';
      el.style.top = (size / 2 * -1) + (height / 2) + 'px';
    }
  }
};


/**
 * Set accepted properties
 */
FocusRipple.propTypes = {
  show: PropTypes.bool
}

/**
 * Set property defaults
 */
FocusRipple.defaultProps = {
  show: false
}

/**
 * An alternate theme may be passed down by a provider
 */
FocusRipple.contextTypes = {
  chamelTheme: PropTypes.object
};


// ES6
export default FocusRipple;
