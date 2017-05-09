import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TouchRipple from 'chamel/ripples/TouchRipple';

/**
 * Test rendering the TouchRipple
 */
describe("TouchRipple Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <TouchRipple
        className="jest-touchripple"
      />
    );

    expect(renderedDocument.type).toBe("div");
    expect(renderedDocument.props.children.length).toBeGreaterThan(0);
  });
});
