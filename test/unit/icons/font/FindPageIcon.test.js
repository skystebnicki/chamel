import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FindPageIcon from 'chamel/icons/font/FindPageIcon';

/**
 * Test rendering the FindPageIcon
 */
describe("FindPageIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FindPageIcon/>
    );

    expect(renderedDocument.props.children).toBe('find_in_page');
  });
});
