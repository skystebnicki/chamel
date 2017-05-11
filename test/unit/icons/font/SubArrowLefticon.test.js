import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SubArrowLeftIcon from 'chamel/icons/font/SubArrowLeftIcon';

/**
 * Test rendering the SubArrowLefticon
 */
describe("SubArrowLeftIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SubArrowLeftIcon/>
    );

    expect(renderedDocument.props.children).toBe('subdirectory_arrow_left');
  });
});
