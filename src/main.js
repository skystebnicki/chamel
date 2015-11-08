/**
 * Main entry point for chamel
 */

module.exports = {
    AppBar: require('./AppBar.jsx'),
    //AppCanvas: require('./app-canvas'),
    Checkbox: require('./Checkbox.jsx'),
    //DatePicker: require('./date-picker/date-picker'),
    Dialog: require('./Dialog.jsx'),
    DialogWindow: require('./DialogWindow.jsx'),
    DropDownIcon: require('./DropDownIcon.jsx'),
    DropDownMenu: require('./DropDownMenu.jsx'),
    EnhancedButton: require('./EnhancedButton.jsx'),
    FlatButton: require('./FlatButton.jsx'),
    //FloatingActionButton: require('./floating-action-button'),
    FontIcon: require('./FontIcon.jsx'),
    IconButton: require('./IconButton.jsx'),
    //Input: require('./Input'),
    LeftNav: require('./LeftNav.jsx'),
    Menu: require('./menu/Menu.jsx'),
    MenuItem: require('./menu/MenuItem.jsx'),
    Mixins: {
        Classable: require('./mixins/classable.jsx'),
        ClickAwayable: require('./mixins/ClickAwayable.jsx'),
        WindowListenable: require('./mixins/WindowListenable.jsx')
    },
    Paper: require('./Paper.jsx'),
    RadioButton: require('./RadioButton.jsx'),
    RadioButtonGroup: require('./RadioButtonGroup.jsx'),
    RaisedButton: require('./RaisedButton.jsx'),
    LinearProgress: require('./progress/LinearProgress.jsx'),
    //Slider: require('./slider'),
    SvgIcon: require('./svg-icons/svg-icon.jsx'),
    Icons: {
        NavigationMenu: require('./svg-icons/navigation-menu.jsx'),
        NavigationChevronLeft: require('./svg-icons/navigation-chevron-left.jsx'),
        NavigationChevronRight: require('./svg-icons/navigation-chevron-right.jsx')
    },
    Tab: require('./tabs/Tab.jsx'),
    Tabs: require('./tabs/Tabs.jsx'),
    Toggle: require('./Toggle.jsx'),
    Snackbar: require('./Snackbar.jsx'),
    TextField: require('./TextField.jsx'),
    TextFieldRich: require('./TextFieldRich.jsx'),
    Toolbar: require('./toolbar/Toolbar.jsx'),
    ToolbarGroup: require('./toolbar/ToolbarGroup.jsx'),
    //Tooltip: require('./tooltip'),
    Utils: {
        CssEvent: require('./utils/CssEvent.jsx'),
        Dom: require('./utils/Dom.jsx'),
        Events: require('./utils/Events.jsx'),
        KeyCode: require('./utils/KeyCode.jsx'),
        KeyLine: require('./utils/KeyLine.jsx')
    }
};
