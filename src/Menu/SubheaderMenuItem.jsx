import React from 'react';
import PropTypes from 'prop-types';
import ThemeService from '../styles/ChamelThemeService';

const SubheaderMenuItem = (props) => {
  let theme = ThemeService.defaultTheme.menu;
  return (
    <div key={props.index} className={theme.menuSubheader}>{props.text}</div>
  );
}

SubheaderMenuItem.propTypes = {
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
};

export default SubheaderMenuItem;
