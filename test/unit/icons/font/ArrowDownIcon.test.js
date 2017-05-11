import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowDownIcon from 'chamel/icons/font/ArrowDownIcon';

/**
 * Test rendering the ArrowDownIcon
 */
describe("ArrowDownIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowDownIcon/>
    );

    expect(renderedDocument.props.children).toBe('arrow_downward');
  });
});
