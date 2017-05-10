import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DatePicker from 'chamel/DatePicker';
import DateTime from 'chamel/utils/DateTime';

/**
 * Test rendering the DatePicker
 */
describe("DatePicker Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const defaultDate = DateTime.getFirstDayOfMonth(new Date());
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DatePicker
        defaultDate={defaultDate}/>
    );
  
    expect(renderedDocument.props.className).toBe('chamel-date-picker');
    expect(renderedDocument.type).toBe('div');
  });
});
