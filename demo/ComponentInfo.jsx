import React, { Component } from 'react';
import PropTypes from 'prop-types';
var CodeExample = require('./CodeExample.jsx');

class ComponentInfo extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        infoArray: PropTypes.array.isRequired,
    }

    render() {
        var propElements = [],
            typesSpan,
            sampleDisplay;

        this.props.infoArray.forEach(function (info, i) {

            if (info.type) typesSpan = <span className="component-info-type">{info.type}</span>;

            if (info.sample) {
                sampleDisplay = (
                    <CodeExample code={info.sample}>
                    </CodeExample>
                )
            }

            propElements.push(
                <tr key={i}>
                    <td className="component-info-name">{info.name}</td>
                    <td className="component-info-desc">
                        <p className="component-info-header">{typesSpan}{info.header}</p>

                        <p>{info.desc}</p>
                    </td>
                    <td>
                        {sampleDisplay}
                    </td>
                </tr>
            );
        });

        return (
            <div className="component-info">
                <h3 className="mui-font-style-title">{this.props.name}</h3>
                <table>
                    <tbody>
                    {propElements}
                    </tbody>
                </table>
            </div>
        );
    }

}

module.exports = ComponentInfo;