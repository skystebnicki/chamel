import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AttachFileIcon from 'chamel/icons/font/AttachFileIcon';

/**
 * Test rendering the AttachFileIcon
 */
describe("AttachFileIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AttachFileIcon/>
    );

    expect(renderedDocument.props.children).toBe('attach_file');
  });
});
