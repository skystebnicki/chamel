var Chamel = require("../../src/main.js");

describe('Controls defined', function() {

    it('shold have AppBar', function() {
        expect(Chamel.AppBar).not.toBeNull();
    });

    it('shold have Checkbox', function() {
        expect(Chamel.Checkbox).not.toBeNull();
    });

    it('shold have Dialog', function() {
        expect(Chamel.Dialog).not.toBeNull();
    });

    it('shold have DialogWindow', function() {
        expect(Chamel.DialogWindow).not.toBeNull();
    });

    it('shold have DropDownIcon', function() {
        expect(Chamel.DropDownIcon).not.toBeNull();
    });

    it('shold have DropDownMenu', function() {
        expect(Chamel.DropDownMenu).not.toBeNull();
    });

    it('shold have EnhancedButton', function() {
        expect(Chamel.EnhancedButton).not.toBeNull();
    });

    it('shold have FlatButton', function() {
        expect(Chamel.FlatButton).not.toBeNull();
    });

    /* ToDo: Not yet implemented
    it('shold have FloatingActionButton', function() {
        expect(Chamel.FloatingActionButton).not.toBeNull();
    });
    */

    it('shold have FontIcon', function() {
        expect(Chamel.FontIcon).not.toBeNull();
    });

    /* ToDo: Not yet implemented
    it('shold have Input', function() {
        expect(Chamel.Input).not.toBeNull();
    });
    */

    it('shold have LeftNav', function() {
        expect(Chamel.LeftNav).not.toBeNull();
    });

    it('shold have Menu', function() {
        expect(Chamel.Menu).not.toBeNull();
    });

    it('shold have MenuItem', function() {
        expect(Chamel.MenuItem).not.toBeNull();
    });

    it('shold have Paper', function() {
        expect(Chamel.Paper).not.toBeNull();
    });

    it('shold have RadioButton', function() {
        expect(Chamel.RadioButton).not.toBeNull();
    });

    it('shold have RadioButtonGroup', function() {
        expect(Chamel.RadioButtonGroup).not.toBeNull();
    });

    it('shold have RaisedButton', function() {
        expect(Chamel.RaisedButton).not.toBeNull();
    });

    it('shold have Tab', function() {
        expect(Chamel.Tab).not.toBeNull();
    });

    it('shold have Tabs', function() {
        expect(Chamel.Tabs).not.toBeNull();
    });

    it('shold have Toggle', function() {
        expect(Chamel.Toggle).not.toBeNull();
    });

    it('shold have Snackbar', function() {
        expect(Chamel.Snackbar).not.toBeNull();
    });

    it('shold have TextField', function() {
        expect(Chamel.TextField).not.toBeNull();
    });

    it('shold have Toolbar', function() {
        expect(Chamel.Toolbar).not.toBeNull();
    });

    it('shold have ToolbarGroup', function() {
        expect(Chamel.ToolbarGroup).not.toBeNull();
    });

});