import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FullScreenExitIcon from 'chamel/icons/font/FullScreenExitIcon';

/**
 * Test rendering the FullScreenExitIcon
 */
describe("FullScreenExitIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FullScreenExitIcon/>
    );

    expect(renderedDocument.props.children).toBe('fullscreen_exit');
  });
});
