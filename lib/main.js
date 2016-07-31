'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Popover = require('./Popover');

var _Popover2 = _interopRequireDefault(_Popover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chamel = {
    AppBar: require('./AppBar'),
    //AppCanvas: require('./app-canvas'),
    AutoComplete: require('./AutoComplete'),
    Checkbox: require('./Checkbox'),
    DatePicker: require('./date-picker/DatePicker'),
    Dialog: require('./Dialog'),
    DialogWindow: require('./DialogWindow'),
    DropDownIcon: require('./DropDownIcon'),
    DropDownMenu: require('./DropDownMenu'),
    Editor: require('./editor/Editor'),
    EnhancedButton: require('./EnhancedButton'),
    FlatButton: require('./FlatButton'),
    //FloatingActionButton: require('./floating-action-button'),
    FontIcon: require('./FontIcon'),
    IconButton: require('./IconButton'),
    //Input: require('./Input'),
    LeftNav: require('./LeftNav'),
    Menu: require('./menu/Menu'),
    MenuItem: require('./menu/MenuItem'),
    NestedMenuItem: require('./menu/NestedMenuItem'),
    Mixins: {
        Classable: require('./mixins/classable'),
        ClickAwayable: require('./mixins/ClickAwayable'),
        WindowListenable: require('./mixins/WindowListenable')
    },
    Paper: require('./Paper'),
    Popover: require('./Popover'),
    RadioButton: require('./RadioButton'),
    RadioButtonGroup: require('./RadioButtonGroup'),
    RaisedButton: require('./RaisedButton'),
    LinearProgress: require('./progress/LinearProgress'),
    //Slider: require('./slider'),
    SvgIcon: require('./svg-icons/svg-icon'),
    Icons: {
        NavigationMenu: require('./svg-icons/navigation-menu'),
        NavigationChevronLeft: require('./svg-icons/navigation-chevron-left'),
        NavigationChevronRight: require('./svg-icons/navigation-chevron-right')
    },
    Tab: require('./tabs/Tab'),
    Tabs: require('./tabs/Tabs'),
    Toggle: require('./Toggle'),
    Snackbar: require('./Snackbar'),
    TextField: require('./TextField'),
    TextFieldRich: require('./TextFieldRich'),
    Toolbar: require('./toolbar/Toolbar'),
    ToolbarGroup: require('./toolbar/ToolbarGroup'),
    //Tooltip: require('./tooltip'),
    Utils: {
        CssEvent: require('./utils/CssEvent'),
        Dom: require('./utils/Dom'),
        Events: require('./utils/Events'),
        KeyCode: require('./utils/KeyCode'),
        KeyLine: require('./utils/KeyLine')
    }
};

// ES6
/**
 * Main entry point for chamel
 */
exports.default = Chamel;

// CommonJS support

if (module) {
    module.exports = Chamel;
}
module.exports = exports['default'];