import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import LastPageIcon from 'chamel/icons/font/LastPageIcon';

/**
 * Test rendering the LastPageIcon
 */
describe("LastPageIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <LastPageIcon/>
    );

    expect(renderedDocument.props.children).toBe('last_page');
  });
});
