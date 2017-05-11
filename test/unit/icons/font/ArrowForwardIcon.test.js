import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowForwardIcon from 'chamel/icons/font/ArrowForwardIcon';

/**
 * Test rendering the ArrowForwardIcon
 */
describe("ArrowForwardIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowForwardIcon />
    );

    expect(renderedDocument.props.children).toBe('arrow_forward');
  });
});
