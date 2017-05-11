import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FlagIcon from 'chamel/icons/font/FlagIcon';

/**
 * Test rendering the FlagIcon
 */
describe("FlagIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FlagIcon/>
    );

    expect(renderedDocument.props.children).toBe('flag');
  });
});
