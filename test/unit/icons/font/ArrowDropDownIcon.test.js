import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowDropDownIcon from 'chamel/icons/font/ArrowDropDownIcon';

/**
 * Test rendering the ArrowDropDownIcon
 */
describe("ArrowDropDownIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowDropDownIcon/>
    );

    expect(renderedDocument.props.children).toBe('arrow_drop_down');
  });
});
