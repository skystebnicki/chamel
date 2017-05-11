import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CodeIcon from 'chamel/icons/font/CodeIcon';

/**
 * Test rendering the AppsIcon
 */
describe("CodeIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CodeIcon/>
    );

    expect(renderedDocument.props.children).toBe('code');
  });
});
