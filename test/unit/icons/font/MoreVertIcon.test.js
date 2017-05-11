import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import MoreVertIcon from 'chamel/icons/font/MoreVertIcon';

/**
 * Test rendering the MoreVertIcon
 */
describe("MoreVertIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <MoreVertIcon/>
    );

    expect(renderedDocument.props.children).toBe('more_vert');
  });
});
