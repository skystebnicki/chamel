import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DatePicker from 'chamel/Picker/DatePicker';
import TextField from 'chamel/Input/TextField';

/**
 * Test rendering the DatePicker
 */
describe('DatePicker Component', () => {
  // Basic validation that render works in edit mode and returns children
  it('Should render', () => {
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(<DatePicker />);
    expect(renderedDocument).not.toBeNull();
  });
});
