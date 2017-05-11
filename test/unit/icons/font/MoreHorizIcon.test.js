import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import MoreHorizIcon from 'chamel/icons/font/MoreHorizIcon';

/**
 * Test rendering the MoreHorizIcon
 */
describe("MoreHorizIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <MoreHorizIcon/>
    );

    expect(renderedDocument.props.children).toBe('more_horiz');
  });
});
