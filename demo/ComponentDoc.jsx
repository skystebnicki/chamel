import React, { Component } from 'react';
import PropTypes from 'prop-types';
var CodeExample = require('./CodeExample.jsx');
var ComponentInfo = require('./ComponentInfo.jsx');

class ComponentDoc extends Component {

  static propTypes = {
    code: PropTypes.string.isRequired,
    desc: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    name: PropTypes.string.isRequired,
    componentInfo: PropTypes.array.isRequired
  }

  render() {
    var classes = "component-doc";

    var componentInfo = this.props.componentInfo.map(function(info, i) {
      return (
          <ComponentInfo
              key={i}
              name={info.name}
              infoArray={info.infoArray}
              />
      );
    });

    var desc = null;

    if (this.props.desc) {
      if ((typeof this.props.desc) == "string") {
        desc = <p className="mui-font-style-subhead-1 component-doc-desc">{this.props.desc}</p>
      } else {
        desc = <div className="mui-font-style-subhead-1 component-doc-desc">{this.props.desc}</div>
      }
    }

    return (
      <div className={classes}>
      
        <h2 className="mui-font-style-headline">{this.props.name}</h2>

        <p>{this.props.desc}</p>

        <CodeExample code={this.props.code}>
          {this.props.children}
        </CodeExample>

        {desc}

        <div className="component-doc-info">
          {componentInfo}
        </div>

      </div>
    );
  }

}

module.exports = ComponentDoc;