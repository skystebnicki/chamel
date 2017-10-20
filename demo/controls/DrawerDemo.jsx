var React = require('react');
import DrawerLeftTemporary from './drawer/DrawerLeftTemporary';
import Button from 'chamel/Button';
import IconButton from 'chamel/Button/IconButton';
import FontIcon from 'chamel/FontIcon';
import CloseIcon from 'chamel/icons/font/CloseIcon';

class DrawerDemo extends React.Component {
  render() {
    return (
      <div>
        <h2>{'Drawer'}</h2>
        <div>
          <DrawerLeftTemporary />
        </div>
      </div>
    );
  }

  _handleClick = e => {
    console.log('Clicked', e);
    return false;
  };
}

module.exports = DrawerDemo;
