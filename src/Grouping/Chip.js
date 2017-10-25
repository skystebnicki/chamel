import React from 'react';
import PropTypes from 'prop-types';
import ThemeService from '../styles/ChamelThemeService';
import CloseIcon from '../icons/font/CloseIcon';

/**
 * Grouping Chip
 *
 * @param props
 * @param context
 * @returns {ReactDOM}
 * @constructor
 */
const Chip = (props, context) => {
  const { children, className, deletable } = props;
  const theme =
    context.chamelTheme && context.chamelTheme.grouping
      ? context.chamelTheme.grouping
      : ThemeService.defaultTheme.grouping;

  let classes = theme.chip || '';
  if (props.className) {
    classes += ' ' + props.className;
  }

  let displayDeleteButton = null;
  if (deletable) {
    displayDeleteButton = (
      <span className={theme.deletable} onClick={props.onDeleteClick}>
        <CloseIcon size={18} />
      </span>
    );
  }

  let displayChildren = children;
  if (typeof displayChildren === 'string') {
    displayChildren = <span>{children}</span>;
  }

  return (
    <div className={classes}>
      <div className={theme.chipChildren}>
        {displayChildren}
      </div>
      {displayDeleteButton}
    </div>
  );
};

/**
 * Set accepted properties
 */
Chip.propTypes = {
  /**
   * Optional class override
   */
  className: PropTypes.string,

  /**
   * Child elements (text and icon)
   */
  children: PropTypes.node,

  /**
   * Flag that will determine if the grouping chip will be displaying the delete icon
   */
  deletable: PropTypes.bool,

  /**
   * Callback function that is called when clicking the delete icon
   */
  onDeleteClick: PropTypes.func,
};

/**
 * An alternate theme may be passed down by a provider
 */
Chip.contextTypes = {
  chamelTheme: PropTypes.object,
};

export default Chip;
