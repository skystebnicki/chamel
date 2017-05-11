import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SendIcon from 'chamel/icons/font/SendIcon';

/**
 * Test rendering the SendIcon
 */
describe("SendIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SendIcon/>
    );

    expect(renderedDocument.props.children).toBe('send');
  });
});
