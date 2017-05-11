import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AttachmentIcon from 'chamel/icons/font/AttachmentIcon';

/**
 * Test rendering the AttachmentIcon
 */
describe("AttachmentIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AttachmentIcon/>
    );

    expect(renderedDocument.props.children).toBe('attachment');
  });
});
