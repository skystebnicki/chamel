import React, { Component } from 'react';
var Chamel = require('chamel/main');
var Dialog = Chamel.Dialog;
var FlatButton = Chamel.FlatButton;
var RaisedButton = Chamel.RaisedButton;
var Toggle = Chamel.Toggle;
var CodeExample = require('../CodeExample');
import Page from 'chamel/Dialog/Page';

class DialogPage extends Component {
  /**
   * Class constructor
   *
   * @param {Object} props Properties to send to the render function
   */
  constructor(props) {
    // Call paprent constructor
    super(props);

    this.state = {
      modal: false,
    };
  }

  render() {
    var code = '';

    var componentInfo = [];

    var standardActions = [{ text: 'Cancel' }];

    var customActions = [
      <FlatButton key={1} label="Cancel" secondary onClick={this._handleCustomDialogCancel} />,
      <FlatButton key={2} label="Submit" primary onClick={this._handleCustomDialogSubmit}>
        {'Submit'}
      </FlatButton>,
    ];

    return (
      <CodeExample name="Dialog" code={code} componentInfo={componentInfo}>
        <RaisedButton onTap={this.handleStandardDialogTouchTap}>{'Standard Actions'}</RaisedButton>
        <br />
        <br />
        <RaisedButton onTap={this.handleCustomDialogTouchTap}>{'Custom Actions'}</RaisedButton>
        <br />
        <br />
        <RaisedButton onTap={this.handleScrollableialogTouchTap}>
          {'Scrollable Actions'}
        </RaisedButton>
        <br />
        <br />
        <RaisedButton onTap={this.handleNestedDialogTouchTap}>{'Nested Dialogs'}</RaisedButton>
        <br />
        <br />
        <RaisedButton onTap={this.handleFullPageDialogTouchTap}>{'Full Page'}</RaisedButton>

        <Dialog
          ref="standardDialog"
          title="Dialog With Standard Actions"
          actions={standardActions}
          actionFocus="submit"
          modal={this.state.modal}
        >
          The actions in this window are created from the json that's passed in.
        </Dialog>

        <Dialog
          ref="customDialog"
          title="Dialog With Custom Actions"
          actions={customActions}
          modal={this.state.modal}
        >
          The actions in this window were passed in as an array of react objects.
        </Dialog>

        <Dialog
          ref="scrollableDialog"
          title="Dialog With Scrollable Content"
          actions={standardActions}
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
        >
          <div style={{ height: '2000px' }}>Really long content</div>
        </Dialog>

        <Dialog
          ref="nestedDialog"
          title="Dialog With a Child"
          actions={standardActions}
          modal={this.state.modal}
        >
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
        <Page
          ref="fullPageDialog"
          title="Fill the entire page"
          autoDetectWindowHeight={true}
          autoScrollBodyContent={true}
          fullPage={true}
        >
          <div style={{ height: '20000px' }}>
            {'Really long content'}
            <RaisedButton label="Close" onClick={this.handleFullPageDialogClose} />
          </div>
        </Page>
      </CodeExample>
    );
  }

  _handleCustomDialogCancel = () => {
    this.refs.customDialog.dismiss();
  };

  _handleCustomDialogSubmit = () => {
    this.refs.customDialog.dismiss();
  };

  _handleScrollableDialogSubmit = () => {
    this.refs.scrollableDialog.dismiss();
  };

  _handleToggleChange = (e, toggled) => {
    this.setState({ modal: toggled });
  };

  handleCustomDialogTouchTap = () => {
    this.refs.customDialog.show();
  };

  handleStandardDialogTouchTap = () => {
    this.refs.standardDialog.show();
  };

  handleScrollableialogTouchTap = () => {
    this.refs.scrollableDialog.show();
  };

  handleNestedDialogTouchTap = () => {
    this.refs.nestedDialog.show();
  };

  handleNestedChildDialogTouchTap = () => {
    this.refs.nestedChildDialog.show();
  };

  handleFullPageDialogTouchTap = () => {
    this.refs.fullPageDialog.show();
  };

  handleFullPageDialogClose = () => {
    this.refs.fullPageDialog.dismiss();
  };
}

module.exports = DialogPage;
