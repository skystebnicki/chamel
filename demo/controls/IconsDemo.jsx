var React = require('react');
var FontIcon = require("../../src/FontIcon.jsx");

var displayIcons = [
    {
        category: "Navigation",
        icons: [
            "close",
            "pencil"
        ]
    },
    {
        category: "Editor Icons",
        icons: [
            "bold",
            "italic",
            "underline",
            "align-center",
            "align-left",
            "align-right",
        ]
    }
]

var EditorDemo = React.createClass({

    render: function() {

        var code = '// TODO: put code example here';

        var iconsContent = [];

        for (var i in displayIcons) {
            iconsContent.push(<h3>{displayIcons[i].category}</h3>);

            var fontIcons = [];
            for (var j in displayIcons[i].icons) {
                var classes = "cfi cfi-" + displayIcons[i].icons[j];
                fontIcons.push(
                    <div className='col-md-4'>
                        <FontIcon className={classes} />
                        <span> </span>
                        {classes}
                    </div>
                );
            }

            iconsContent.push(<div className='row'>{fontIcons}</div>);
        }

        return (
            <div className="row">
                {iconsContent}
            </div>
        );
    }

});

module.exports = EditorDemo;
