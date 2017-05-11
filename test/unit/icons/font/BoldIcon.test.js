import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import BoldIcon from 'chamel/icons/font/BoldIcon';

/**
 * Test rendering the AppsIcon
 */
describe("BoldIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <BoldIcon/>
    );

    expect(renderedDocument.props.children).toBe('format_bold');
  });
});
