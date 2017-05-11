import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FirstPageIcon from 'chamel/icons/font/FirstPageIcon';

/**
 * Test rendering the FirstPageIcon
 */
describe("FirstPageIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FirstPageIcon/>
    );

    expect(renderedDocument.props.children).toBe('first_page');
  });
});
