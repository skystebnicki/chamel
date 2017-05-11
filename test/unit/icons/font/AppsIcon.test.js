import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AppsIcon from 'chamel/icons/font/AppsIcon';

/**
 * Test rendering the AppsIcon
 */
describe("AppsIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AppsIcon/>
    );

    expect(renderedDocument.props.children).toBe('apps');
  });
});
