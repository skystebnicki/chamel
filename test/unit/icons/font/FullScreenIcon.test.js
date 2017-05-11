import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FullScreenIcon from 'chamel/icons/font/FullScreenIcon';

/**
 * Test rendering the FullScreenIcon
 */
describe("FullScreenIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FullScreenIcon/>
    );

    expect(renderedDocument.props.children).toBe('fullscreen');
  });
});
