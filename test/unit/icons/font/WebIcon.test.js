import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import WebIcon from 'chamel/icons/font/WebIcon';

/**
 * Test rendering the WebIcon
 */
describe("WebIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <WebIcon/>
    );

    expect(renderedDocument.props.children).toBe('web');
  });
});
