import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DateDisplay from 'chamel/DatePicker/DateDisplay';
import DateTime from 'chamel/utils/DateTime';

/**
 * Test rendering the DateDisplay
 */
describe("DateDisplay Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const selectedDate = DateTime.getFirstDayOfMonth(new Date());
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DateDisplay
        selectedDate={selectedDate}/>
    );

    expect(renderedDocument.props.className).toBe('chamel-date-picker-date-display');
    expect(renderedDocument.type).toBe('div');
  });
});
