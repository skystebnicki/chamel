import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ExpandLessIcon from 'chamel/icons/font/ExpandLessIcon';

/**
 * Test rendering the ExpandLessIcon
 */
describe("ExpandLessIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ExpandLessIcon/>
    );

    expect(renderedDocument.props.children).toBe('expand_less');
  });
});
