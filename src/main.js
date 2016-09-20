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
import DropDownMenu from './DropDownMenu/DropDownMenu';
import EnhancedButton from './Button';
import FlatButton from './Button/FlatButton';
import FontIcon from './FontIcon/FontIcon';
import IconButton from './Button/IconButton';
import LeftNav from './LeftNav/LeftNav';
import Menu from './Menu/Menu';
import MenuItem from './Menu/Menu';
import NestedMenuItem from './Menu/NestedMenuItem';
import Classable from './mixins/classable';
import ClickAwayable from './mixins/ClickAwayable';
import WindowListenable from './mixins/WindowListenable';
import Paper from './Paper/Paper';
import RadioButton from './Picker/RadioButton';
import RadioButtonGroup from './Picker/RadioPicker';
import RaisedButton from './Button/RaisedButton';
import LinearProgress from './Progress/LinearProgress';
import SvgIcon from './svg-icons/svg-icon';
import NavigationMenu from './svg-icons/navigation-menu';
import NavigationChevronLeft from './svg-icons/navigation-chevron-left';
import NavigationChevronRight from './svg-icons/navigation-chevron-right';
import Tab from './Tabs/Tab';
import Tabs from './Tabs/Tabs';
import Toggle from './Toggle';
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

// This is only for legacy applications
import materialTheme from './styles/theme/material/material';

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
  DropDownMenu: DropDownMenu, 
  Editor: Editor,
  EnhancedButton: EnhancedButton,
  FlatButton: FlatButton, 
  FontIcon: FontIcon,
  IconButton: IconButton,
  LeftNav: LeftNav,
  Menu: Menu,
  MenuItem: MenuItem, 
  NestedMenuItem: NestedMenuItem, 
  Mixins: {
      Classable: Classable,
      ClickAwayable: ClickAwayable,
      WindowListenable: WindowListenable 
  },
  Paper: Paper,
  Popover: Popover,
  RadioButton: RadioButton,
  RadioButtonGroup: RadioButtonGroup,
  RaisedButton: RaisedButton,
  LinearProgress: LinearProgress,
  SvgIcon: SvgIcon,
  Icons: {
      NavigationMenu: NavigationMenu,
      NavigationChevronLeft: NavigationChevronLeft,
      NavigationChevronRight: NavigationChevronRight
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
      KeyLine: KeyLine
  }
};

// ES6
export default Chamel;

// CommonJS support
if (module) {
  module.exports = Chamel;
}
