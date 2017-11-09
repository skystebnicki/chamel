import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DayButton from 'chamel/DatePicker/DayButton';
import DateTime from 'chamel/utils/DateTime';

/**
 * Test rendering the DayButton
 */
describe("DayButton Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const date = DateTime.getFirstDayOfMonth(new Date());
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DayButton
        date={date}
        selected={true}/>
    );
    
    expect(renderedDocument.props.className).toContain('chamel-date-picker-day-button chamel-is-selected');
    expect(renderedDocument.props.type).toBe('raised');
  });
});
