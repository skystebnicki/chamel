import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import PrintIcon from 'chamel/icons/font/PrintIcon';

/**
 * Test rendering the PrintIcon
 */
describe("PrintIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <PrintIcon/>
    );

    expect(renderedDocument.props.children).toBe('print');
  });
});
