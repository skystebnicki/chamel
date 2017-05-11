import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CheckIcon from 'chamel/icons/font/CheckIcon';

/**
 * Test rendering the CheckIcon
 */
describe("CheckIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CheckIcon/>
    );

    expect(renderedDocument.props.children).toBe('check');
  });
});
