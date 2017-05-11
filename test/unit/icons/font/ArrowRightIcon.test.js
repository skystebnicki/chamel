import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ArrowRightIcon from 'chamel/icons/font/ArrowRightIcon';

/**
 * Test rendering the ArrowRightIcon
 */
describe("ArrowRightIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ArrowRightIcon/>
    );

    expect(renderedDocument.props.children).toBe('keyboard_arrow_right');
  });
});
