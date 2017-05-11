import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ItalicIcon from 'chamel/icons/font/ItalicIcon';

/**
 * Test rendering the GroupIcon
 */
describe("ItalicIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ItalicIcon/>
    );

    expect(renderedDocument.props.children).toBe('format_italic');
  });
});
