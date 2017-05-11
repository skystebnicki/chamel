import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowDropDownCircleIcon from 'chamel/icons/font/ArrowDropDownCircleIcon';

/**
 * Test rendering the ArrowDropDownCircleIcon
 */
describe("ArrowDropDownCircleIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowDropDownCircleIcon/>
    );

    expect(renderedDocument.props.children).toBe('arrow_drop_down_circle');
  });
});
