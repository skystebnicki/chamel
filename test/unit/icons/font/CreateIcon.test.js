import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CreateIcon from 'chamel/icons/font/CreateIcon';

/**
 * Test rendering the AppsIcon
 */
describe("CreateIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CreateIcon/>
    );

    expect(renderedDocument.props.children).toBe('iconCreate');
  });
});
