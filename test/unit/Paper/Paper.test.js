import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Paper from 'chamel/Paper';

/**
 * Test rendering the Overlay
 */
describe("Paper Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Paper/>
    );

    expect(renderedDocument.type).toBe('div');

  });
});
