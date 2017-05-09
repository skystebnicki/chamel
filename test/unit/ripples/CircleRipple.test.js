import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CircleRipple from 'chamel/ripples/CircleRipple';

/**
 * Test rendering the CircleRipple
 */
describe("CircleRipple Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CircleRipple
        className="jest-CircleRipple"
      />
    );

    expect(renderedDocument.props.children.type).toBe("div");
  });
});
