import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ChevronLeftIcon from 'chamel/icons/font/ChevronLeftIcon';

/**
 * Test rendering the AppsIcon
 */
describe("ChevronLeftIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ChevronLeftIcon/>
    );

    expect(renderedDocument.props.children).toBe('chevron_left');
  });
});
