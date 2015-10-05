/**
 * Main entry point for chamel
 */

module.exports = {
    AppBar: require('./AppBar.jsx'),
    //AppCanvas: require('./js/app-canvas'),
    //Checkbox: require('./js/checkbox'),
    //DatePicker: require('./js/date-picker/date-picker'),
    //Dialog: require('./js/dialog'),
    //DialogWindow: require('./js/dialog-window'),
    //DropDownIcon: require('./js/drop-down-icon'),
    //DropDownMenu: require('./js/drop-down-menu'),
    EnhancedButton: require('./EnhancedButton.jsx'),
    FlatButton: require('./FlatButton.jsx'),
    //FloatingActionButton: require('./js/floating-action-button'),
    FontIcon: require('./FontIcon.jsx'),
    IconButton: require('./IconButton.jsx'),
    //Input: require('./js/input'),
    //LeftNav: require('./js/left-nav'),
    //Menu: require('./js/menu/menu'),
    //MenuItem: require('./js/menu/menu-item'),
    Mixins: {
        Classable: require('./mixins/classable.jsx'),
        ClickAwayable: require('./mixins/ClickAwayable.jsx'),
        WindowListenable: require('./mixins/WindowListenable.jsx')
    },
    Paper: require('./Paper.jsx'),
    //RadioButton: require('./js/radio-button'),
    //RadioButtonGroup: require('./js/radio-button-group'),
    RaisedButton: require('./RaisedButton.jsx'),
    //Slider: require('./js/slider'),
    SvgIcon: require('./svg-icons/svg-icon.jsx'),
    Icons: {
        NavigationMenu: require('./svg-icons/navigation-menu.jsx'),
        NavigationChevronLeft: require('./svg-icons/navigation-chevron-left.jsx'),
        NavigationChevronRight: require('./svg-icons/navigation-chevron-right.jsx')
    },
    //Tab: require('./js/tabs/tab'),
    //Tabs: require('./js/tabs/tabs'),
    //Toggle: require('./js/toggle'),
    //Snackbar: require('./js/snackbar'),
    //TextField: require('./js/text-field'),
    //Toolbar: require('./js/toolbar'),
    //ToolbarGroup: require('./js/toolbar-group'),
    //Tooltip: require('./js/tooltip'),
    Utils: {
        CssEvent: require('./utils/CssEvent.jsx'),
        Dom: require('./utils/Dom.jsx'),
        Events: require('./utils/Events.jsx'),
        KeyCode: require('./utils/KeyCode.jsx'),
        KeyLine: require('./utils/KeyLine.jsx')
    }
};
