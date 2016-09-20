import React from 'react';
import Row from 'chamel/Grid/Row';
import Column from 'chamel/Grid/Column';

// Font icons
import Icons from 'chamel/icons/font';

var EditorDemo = React.createClass({

    render: function() {

        var code = '// TODO: put code example here';

        var iconsContent = [];

        for (var category in Icons) {
          iconsContent.push(<h3>{category}</h3>);

          let fontIcons = [];
          for (var i in Icons[category]) {
            fontIcons.push(
              <Column small={6} medium={4} large={2} style={{height: "120px"}}>
                <div style={{textAlign: "center"}}>
                  {React.createElement(Icons[category][i].icon)}
                </div>
                <div style={{textAlign: "center"}}>{Icons[category][i].name}</div>
              </Column>
            );
          }

          iconsContent.push(<Row>{fontIcons}</Row>);
        }

        return (
          <div>
            {iconsContent}
          </div>
        );
    }

});

module.exports = EditorDemo;
