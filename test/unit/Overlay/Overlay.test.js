import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Overlay from 'chamel/Overlay';

/**
 * Test rendering the Overlay
 */
describe("Overlay Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Overlay
        show={true}
        />
    );
    
    expect(renderedDocument.type).toBe('div');

  });
});
