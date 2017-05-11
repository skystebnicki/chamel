import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowBackIcon from 'chamel/icons/font/ArrowBackIcon';

/**
 * Test rendering the ArrowBackIcon
 */
describe("ArrowBackIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowBackIcon/>
    );

    expect(renderedDocument.props.children).toBe('arrow_back');
  });
});
