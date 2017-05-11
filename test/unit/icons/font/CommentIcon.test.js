import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CommentIcon from 'chamel/icons/font/CommentIcon';

/**
 * Test rendering the CommentIcon
 */
describe("CommentIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CommentIcon/>
    );

    expect(renderedDocument.props.children).toBe('comment');
  });
});
