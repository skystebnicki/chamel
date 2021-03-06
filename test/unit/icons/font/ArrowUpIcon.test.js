import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowUpIcon from 'chamel/icons/font/ArrowUpIcon';

/**
 * Test rendering the AppsIcon
 */
describe("ArrowUpIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowUpIcon/>
    );

    expect(renderedDocument.props.children).toBe('arrow_upward');
  });
});
