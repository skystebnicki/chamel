import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowDropUpIcon from 'chamel/icons/font/ArrowDropUpIcon';

/**
 * Test rendering the ArrowDropUpIcon
 */
describe("ArrowDropUpIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowDropUpIcon/>
    );

    expect(renderedDocument.props.children).toBe('arrow_drop_up');
  });
});
