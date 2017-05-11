import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import BuildIcon from 'chamel/icons/font/BuildIcon';

/**
 * Test rendering the BuildIcon
 */
describe("BuildIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <BuildIcon/>
    );

    expect(renderedDocument.props.children).toBe('build');
  });
});
