import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import BorderColorIcon from 'chamel/icons/font/BorderColorIcon';

/**
 * Test rendering the AppsIcon
 */
describe("BorderColorIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <BorderColorIcon/>
    );

    expect(renderedDocument.props.children).toBe('border_color');
  });
});
