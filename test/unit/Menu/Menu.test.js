import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Menu from 'chamel/Menu';

/**
 * Test rendering the Menu
 */
describe("Menu Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Menu
        zDepth={0}/>
    );
    console.log(renderedDocument);

    expect(renderedDocument.props.zDepth).toBe(0);
  });
});
