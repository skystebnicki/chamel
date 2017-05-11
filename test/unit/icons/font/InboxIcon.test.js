import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import InboxIcon from 'chamel/icons/font/InboxIcon';

/**
 * Test rendering the InboxIcon
 */
describe("InboxIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <InboxIcon/>
    );

    expect(renderedDocument.props.children).toBe('inbox');
  });
});
