import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import StreetViewIcon from 'chamel/icons/font/StreetViewIcon';

/**
 * Test rendering the StreetViewIcon
 */
describe("StreetViewIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <StreetViewIcon/>
    );

    expect(renderedDocument.props.children).toBe('streetview');
  });
});
