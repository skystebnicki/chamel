import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Snackbar from 'chamel/Snackbar';

/**
 * Test rendering the Snackbar
 */
describe("Snackbar Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Snackbar
        action="jest-test"
        message="jest-Snackbar"
      />
    );

    expect(renderedDocument.type).toBe("span")
    expect(renderedDocument.props.children.length).toBeGreaterThan(0);
  });
});
