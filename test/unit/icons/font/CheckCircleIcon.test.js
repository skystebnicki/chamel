import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CheckCircleIcon from 'chamel/icons/font/CheckCircleIcon';

/**
 * Test rendering the CheckCircleIcon
 */
describe("CheckCircleIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CheckCircleIcon/>
    );

    expect(renderedDocument.props.children).toBe('check_circle');
  });
});
