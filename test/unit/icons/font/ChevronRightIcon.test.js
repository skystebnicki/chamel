import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ChevronRightIcon from 'chamel/icons/font/ChevronRightIcon';

/**
 * Test rendering the AppsIcon
 */
describe("ChevronRightIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ChevronRightIcon/>
    );

    expect(renderedDocument.props.children).toBe('chevron_right');
  });
});
