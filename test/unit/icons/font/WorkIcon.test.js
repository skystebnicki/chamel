import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import WorkIcon from 'chamel/icons/font/WorkIcon';

/**
 * Test rendering the WorkIcon
 */
describe("WorkIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <WorkIcon/>
    );

    expect(renderedDocument.props.children).toBe('work');
  });
});
