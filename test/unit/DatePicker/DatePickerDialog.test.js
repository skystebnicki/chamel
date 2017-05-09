import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DatePickerDialog from 'chamel/DatePicker/DatePickerDialog';
import DateTime from 'chamel/utils/DateTime';

/**
 * Test rendering the DatePickerDialog
 */
describe("DatePickerDialog Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const initialDate = DateTime.getFirstDayOfMonth(new Date());
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DatePickerDialog
        initialDate={initialDate}/>
    );
    expect(renderedDocument.props.className).toBe('chamel-date-picker-dialog');
    expect(renderedDocument.ref).toBe('dialogWindow');
  });
});
