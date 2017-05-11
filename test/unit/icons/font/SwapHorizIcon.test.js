import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SwapHorizIcon from 'chamel/icons/font/SwapHorizIcon';

/**
 * Test rendering the SwapHorizIcon
 */
describe("SwapHorizIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SwapHorizIcon/>
    );

    expect(renderedDocument.props.children).toBe('swap_horiz');
  });
});
