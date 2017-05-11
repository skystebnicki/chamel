import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import StyleIcon from 'chamel/icons/font/StyleIcon';

/**
 * Test rendering the StyleIcon
 */
describe("StyleIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <StyleIcon/>
    );

    expect(renderedDocument.props.children).toBe('style');
  });
});
