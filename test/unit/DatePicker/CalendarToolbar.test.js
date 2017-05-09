import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CalendarToolbar from 'chamel/DatePicker/CalendarToolbar';
import DateTime from 'chamel/utils/DateTime';

/**
 * Test rendering the CalendarToolbar
 */
describe("CalendarToolbar Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const displayDate = DateTime.getFirstDayOfMonth(new Date());
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CalendarToolbar
        displayDate={displayDate}/>
    );
    
    expect(renderedDocument.props.className).toBe('chamel-date-picker-calendar-toolbar');
    expect(renderedDocument.type).toBe('div');
  });
});
