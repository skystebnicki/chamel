import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import PhotoCameraIcon from 'chamel/icons/font/PhotoCameraIcon';

/**
 * Test rendering the PhotoCameraIcon
 */
describe("PhotoCameraIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <PhotoCameraIcon/>
    );

    expect(renderedDocument.props.children).toBe('photo_camera');
  });
});
