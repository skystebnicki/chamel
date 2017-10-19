import React, { Component } from 'react';
import Row from 'chamel/Grid/Row';
import Column from 'chamel/Grid/Column';

// Font icons
import Icons from 'chamel/icons/font';

class IconDemo extends Component {
  render() {
    var code = '// TODO: put code example here';

    var iconsContent = [];

    for (var category in Icons) {
      iconsContent.push(<h3 key={'h3' + category}>{category}</h3>);

      let fontIcons = [];
      for (var i in Icons[category]) {
        fontIcons.push(
          <Column key={i} small={6} medium={4} large={2} style={{ height: '120px' }}>
            <div style={{ textAlign: 'center' }}>
              {React.createElement(Icons[category][i].icon)}
            </div>
            <div style={{ textAlign: 'center' }}>{Icons[category][i].name}</div>
          </Column>,
        );
      }

      iconsContent.push(<Row key={'row' + category}>{fontIcons}</Row>);
    }

    return <div>{iconsContent}</div>;
  }
}

module.exports = IconDemo;
