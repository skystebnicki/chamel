import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CancelIcon from 'chamel/icons/font/CancelIcon';

/**
 * Test rendering the CancelIcon
 */
describe("CancelIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CancelIcon/>
    );

    expect(renderedDocument.props.children).toBe('cancel');
  });
});
