import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Toolbar from 'chamel/Toolbar/Toolbar';

/**
 * Test rendering the Toolbar
 */
describe("Toolbar Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Toolbar
        secondary={true}>
        <div>{'Test Toolbar Here'}</div>
      </Toolbar>
    );

    expect(renderedDocument.type).toBe("div")
    expect(renderedDocument.props.children.type).toBe("div");
  });
});
