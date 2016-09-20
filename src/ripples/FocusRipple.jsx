import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

class FocusRipple extends React.Component {

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
        ? this.context.chamelTheme.ripple : {};

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
    var el = ReactDOM.findDOMNode(this);
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    var size = Math.max(height, width);

    el.style.height = size + 'px';
    el.style.top = (size / 2 * -1) + (height / 2) + 'px';
  }
};


/**
 * Set accepted properties
 */
FocusRipple.propTypes = {
  show: React.PropTypes.bool
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
    chamelTheme: React.PropTypes.object
};

// Check for commonjs
if (module) {
    module.exports = FocusRipple;
}

// ES6
export default FocusRipple;