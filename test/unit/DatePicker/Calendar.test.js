import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Calendar from 'chamel/DatePicker/Calendar';

/**
 * Test rendering the Calendar
 */
describe("Calendar Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Calendar
        isActive={true}
      />
    );

    expect(renderedDocument.props.className).toBe('chamel-date-picker-calendar chamel-is-5week');
    expect(renderedDocument.type).toBe('div');
  });
});
