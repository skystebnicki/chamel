import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import MenuIcon from 'chamel/icons/font/MenuIcon';

/**
 * Test rendering the MenuIcon
 */
describe("MenuIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <MenuIcon/>
    );

    expect(renderedDocument.props.children).toBe('menu');
  });
});
