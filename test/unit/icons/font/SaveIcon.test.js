import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SaveIcon from 'chamel/icons/font/SaveIcon';

/**
 * Test rendering the SaveIcon
 */
describe("SaveIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SaveIcon/>
    );

    expect(renderedDocument.props.children).toBe('save');
  });
});
