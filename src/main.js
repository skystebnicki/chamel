/**
 * Main entry point for chamel
 */
import Popover from './Popover/Popover';
import Editor from './Editor/Editor';
import AppBar from './AppBar/AppBar';
import AutoComplete from './AutoComplete/AutoComplete';
import Checkbox from './Toggle/Checkbox';
import DatePicker from './DatePicker/DatePicker';
import Dialog from './Dialog/Dialog';
import DropDownIcon from './DropDownIcon';
import SelectField from './Picker/SelectField';
import EnhancedButton from './Button';
import FlatButton from './Button/FlatButton';
import FontIcon from './FontIcon/FontIcon';
import IconButton from './Button/IconButton';
import Drawer from './Drawer';
import Menu from './Menu/Menu';
import MenuItem from './Menu/Menu';
import NestedMenuItem from './Menu/NestedMenuItem';
import Paper from './Paper/Paper';
import RadioButton from './Picker/RadioButton';
import RadioPicker from './Picker/RadioPicker';
import RaisedButton from './Button/RaisedButton';
import LinearProgress from './Progress/LinearProgress';
import CircularProgress from './Progress/CircularProgress';
import SvgIcon from './svg-icons/svg-icon';
import NavigationMenu from './svg-icons/navigation-menu';
import NavigationChevronLeft from './svg-icons/navigation-chevron-left';
import NavigationChevronRight from './svg-icons/navigation-chevron-right';
import Tab from './Tabs/Tab';
import Tabs from './Tabs/Tabs';
import Toggle from './Toggle/Switch';
import Snackbar from './Snackbar/Snackbar';
import TextField from './Input/TextField';
import TextFieldRich from './TextFieldRich/TextFieldRich';
import Toolbar from './Toolbar/Toolbar';
import ToolbarGroup from './Toolbar/ToolbarGroup';
import CssEvent from './utils/CssEvent';
import Dom from './utils/Dom';
import Events from './utils/Events';
import KeyCode from './utils/KeyCode';
import KeyLine from './utils/KeyLine';

/**
 * Do we need to move all these to jsx?
 */
const Chamel = {
  AppBar: AppBar,
  AutoComplete: AutoComplete,
  Checkbox: Checkbox,
  DatePicker: DatePicker,
  Dialog: Dialog,
  DropDownIcon: DropDownIcon,
  SelectField: SelectField,
  Editor: Editor,
  EnhancedButton: EnhancedButton,
  FlatButton: FlatButton,
  FontIcon: FontIcon,
  IconButton: IconButton,
  Drawer: Drawer,
  Menu: Menu,
  MenuItem: MenuItem,
  NestedMenuItem: NestedMenuItem,
  Paper: Paper,
  Popover: Popover,
  RadioButton: RadioButton,
  RadioButtonGroup: RadioPicker,
  RaisedButton: RaisedButton,
  LinearProgress: LinearProgress,
  CircularProgress: CircularProgress,
  SvgIcon: SvgIcon,
  Icons: {
    NavigationMenu: NavigationMenu,
    NavigationChevronLeft: NavigationChevronLeft,
    NavigationChevronRight: NavigationChevronRight,
  },
  Tab: Tab,
  Tabs: Tabs,
  Toggle: Toggle,
  Snackbar: Snackbar,
  TextField: TextField,
  TextFieldRich: TextFieldRich,
  Toolbar: Toolbar,
  ToolbarGroup: ToolbarGroup,
  Utils: {
    CssEvent: CssEvent,
    Dom: Dom,
    Events: Events,
    KeyCode: KeyCode,
    KeyLine: KeyLine,
  },
};

// ES6
export default Chamel;

// CommonJS support
if (module) {
  module.exports = Chamel;
}
