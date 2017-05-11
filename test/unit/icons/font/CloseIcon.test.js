import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CloseIcon from 'chamel/icons/font/CloseIcon';

/**
 * Test rendering the CloseIcon
 */
describe("CloseIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CloseIcon/>
    );

    expect(renderedDocument.props.children).toBe('close');
  });
});
