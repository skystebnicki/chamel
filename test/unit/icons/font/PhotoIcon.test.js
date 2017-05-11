import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import PhotoIcon from 'chamel/icons/font/PhotoIcon';

/**
 * Test rendering the PhotoIcon
 */
describe("PhotoIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <PhotoIcon/>
    );

    expect(renderedDocument.props.children).toBe('photo');
  });
});
