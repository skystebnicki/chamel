import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DateRangeIcon from 'chamel/icons/font/DateRangeIcon';

/**
 * Test rendering the DateRangeIcon
 */
describe("DateRangeIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DateRangeIcon/>
    );

    expect(renderedDocument.props.children).toBe('date_range');
  });
});
