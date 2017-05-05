import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from '../Paper/Paper';
import Classable from '../mixins/classable';
import RadioButton from '../Picker/RadioButton';

class RadioButtonGroup extends Component {

  // mixins: [Classable],

  _hasCheckAttribute = (radioButton) => {
    return radioButton.props.hasOwnProperty('checked') &&
      radioButton.props.checked;
  };

  /**
   * Class constructor takes properties and passes them to the parent/super
   */
  constructor(props) {
    super(props);

    this.state = {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || ''
    };
  }

  componentWillMount() {
    let cnt = 0;

    this.props.children.forEach(function(option) {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({numberCheckedRadioButtons: cnt});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({selected: nextProps.valueSelected});
    }
  }

  render() {

    console.log(this.state.selected)

    const inline = this.props.inline;

    const options = this.props.children.map(function(option) {

    let {
        name,
        value,
        label,
        onCheck,
        ...other
      } = option.props;

      return <RadioButton
        {...other}
        inline={inline}
        ref={option.props.value}
        name={this.props.name}
        key={option.props.value}
        value={option.props.value}
        label={option.props.label}
        labelPosition={this.props.labelPosition}
        onSelect={this._onChange}
        checked={option.props.value == this.state.selected}/>

    }, this);

    return (
      <div>
        {options}
      </div>
    );
  }

  _updateRadioButtons = (newSelection) => {
    if (this.state.numberCheckedRadioButtons == 0) {
      this.setState({selected: newSelection});
    } else if (process.env.NODE_ENV !== 'production') {
      const message = "Cannot select a different radio button while another radio button " +
                    "has the 'checked' property set to true.";
      console.error(message);
    }
  };

  _onChange = (newSelection) => {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons == 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
  };

  getSelectedValue = () => {
    return this.state.selected;
  };

  setSelectedValue = (newSelection) => {
    this._updateRadioButtons(newSelection);
  };

  clearValue = () => {
    this.setSelectedValue('');
  };

}


RadioButtonGroup.propTypes: {
  name: PropTypes.string.isRequired,
  valueSelected: PropTypes.string,

  /**
   * Set which value is
  defaultSelected: React.PropTypes.string,

  /**
   * Float the label to the left or right of the radio button
   *
   * @type {string}
   */
  labelPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * Callback trigger fired when a user selects a new radio option
   *
   * @type {function}
   */
  onChange: PropTypes.func,

  /**
   * Inline is used to determine if the radio buttons s are printed side-by-side
   *
   * @default true
   * @type {bool}
   */
  inline: PropTypes.bool
};

/**
 * Set default properties if not set by the calling component
 */
RadioButtonGroup.defaultProps = {
  inline: false
};

export default RadioButtonGroup;
