import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import LinkIcon from 'chamel/icons/font/LinkIcon';

/**
 * Test rendering the LinkIcon
 */
describe("LinkIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <LinkIcon/>
    );

    expect(renderedDocument.props.children).toBe('insert_link');
  });
});
