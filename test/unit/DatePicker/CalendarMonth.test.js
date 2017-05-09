import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CalendarMonth from 'chamel/DatePicker/CalendarMonth';
import DateTime from 'chamel/utils/DateTime';

/**
 * Test rendering the CalendarMonth
 */
describe("CalendarMonth Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const displayDate = DateTime.getFirstDayOfMonth(new Date());
    const selectedDate = DateTime.clone(displayDate);
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CalendarMonth
        displayDate={displayDate}
        selectedDate={selectedDate}/>
    );

    expect(renderedDocument.props.className).toBe('chamel-date-picker-calendar-month');
    expect(renderedDocument.type).toBe('div');
  });
});
