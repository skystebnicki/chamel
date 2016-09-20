var React = require('react');
var Chamel = require("../../src/main");
var Dialog = Chamel.Dialog;
var FlatButton = Chamel.FlatButton;
var RaisedButton = Chamel.RaisedButton;
var Toggle = Chamel.Toggle;
var CodeExample = require("../CodeExample");

var DialogPage = React.createClass({

    getInitialState: function() {
        return {
            modal: false
        };
    },

    render: function() {

        var code = '';

        var componentInfo = [];

        var standardActions = [
            { text: 'Cancel' }
        ];

        var customActions = [
            <FlatButton
                key={1}
                label="Cancel"
                secondary
                onClick={this._handleCustomDialogCancel} />,
            <FlatButton
                key={2}
                label="Submit"
                primary
                onClick={this._handleCustomDialogSubmit}>
              {"Submit"}
            </FlatButton>
        ];

        return (
            <CodeExample
                name="Dialog"
                code={code}
                componentInfo={componentInfo}>

                <RaisedButton onTap={this.handleStandardDialogTouchTap}>{"Standard Actions"}</RaisedButton>
                <br/><br/>
                <RaisedButton onTap={this.handleCustomDialogTouchTap}>{"Custom Actions"}</RaisedButton>
                <br/><br/>
                <RaisedButton onTap={this.handleScrollableialogTouchTap}>{"Scrollable Actions"}</RaisedButton>
                <br/><br/>
                <RaisedButton onTap={this.handleNestedDialogTouchTap}>{"Nested Dialogs"}</RaisedButton>

                <Dialog
                    ref="standardDialog"
                    title="Dialog With Standard Actions"
                    actions={standardActions}
                    actionFocus="submit"
                    modal={this.state.modal}>
                    The actions in this window are created from the json that's passed in.
                </Dialog>

                <Dialog
                    ref="customDialog"
                    title="Dialog With Custom Actions"
                    actions={customActions}
                    modal={this.state.modal}>
                    The actions in this window were passed in as an array of react objects.
                </Dialog>

                <Dialog 
                    ref="scrollableDialog"
                    title="Dialog With Scrollable Content" 
                    actions={standardActions}
                    autoDetectWindowHeight={true} 
                    autoScrollBodyContent={true}>
                    <div style={{height: '2000px'}}>Really long content</div>
                </Dialog>

                 <Dialog
                    ref="nestedDialog"
                    title="Dialog With a Child"
                    actions={standardActions}
                    modal={this.state.modal}>
                    <Dialog
                        ref="nestedChildDialog"
                        title="Child Dialog"
                        actions={standardActions}
                        modal={this.state.modal}
                    >
                        Child Content
                    </Dialog>
                    <RaisedButton label="Show Child" onClick={this.handleNestedChildDialogTouchTap} />
                </Dialog>

            </CodeExample>
        );

    },

    _handleCustomDialogCancel: function() {
        this.refs.customDialog.dismiss();
    },

    _handleCustomDialogCancel: function() {
        this.refs.customDialog.dismiss();
    },

    _handleCustomDialogSubmit: function() {
        this.refs.customDialog.dismiss();
    },

    _handleScrollableDialogSubmit: function() {
        this.refs.scrollableDialog.dismiss();
    },

    _handleToggleChange: function(e, toggled) {
        this.setState({modal: toggled});
    },

    handleCustomDialogTouchTap: function() {
        this.refs.customDialog.show();
    },

    handleStandardDialogTouchTap: function() {
        this.refs.standardDialog.show();
    },

    handleScrollableialogTouchTap: function() {
        this.refs.scrollableDialog.show();
    },

    handleNestedDialogTouchTap: function() {
        this.refs.nestedDialog.show();
    },

    handleNestedChildDialogTouchTap: function() {
        this.refs.nestedChildDialog.show();
    }

});

module.exports = DialogPage;
