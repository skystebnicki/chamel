import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import MergeIcon from 'chamel/icons/font/MergeIcon';

/**
 * Test rendering the MergeIcon
 */
describe("MergeIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <MergeIcon/>
    );

    expect(renderedDocument.props.children).toBe('merge');
  });
});
