import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ContentPasteIcon from 'chamel/icons/font/ContentPaste';

/**
 * Test rendering the ContentPasteIcon
 */
describe("ContentPasteIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ContentPasteIcon/>
    );

    expect(renderedDocument.props.children).toBe('content_paste');
  });
});
