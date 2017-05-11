import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SubArrowRightIcon from 'chamel/icons/font/SubArrowRightIcon';

/**
 * Test rendering the SubArrowRightIcon
 */
describe("SubArrowRightIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SubArrowRightIcon/>
    );

    expect(renderedDocument.props.children).toBe('subdirectory_arrow_right');
  });
});
