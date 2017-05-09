import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Drawer from 'chamel/Drawer';

/**
 * Test rendering the Drawer
 */
describe("Drawer Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Drawer
        open={true}
      />
    );

    expect(renderedDocument.type).toBe('div');
  });
});
