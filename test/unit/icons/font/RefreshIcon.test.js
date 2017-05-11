import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import RefreshIcon from 'chamel/icons/font/RefreshIcon';

/**
 * Test rendering the RefreshIcon
 */
describe("RefreshIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <RefreshIcon/>
    );

    expect(renderedDocument.props.children).toBe('refresh');
  });
});
