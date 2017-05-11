import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import UnderlinedIcon from 'chamel/icons/font/UnderlinedIcon';

/**
 * Test rendering the UnderlinedIcon
 */
describe("UnderlinedIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <UnderlinedIcon/>
    );

    expect(renderedDocument.props.children).toBe('format_underlined');
  });
});
