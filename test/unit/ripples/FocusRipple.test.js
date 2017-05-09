import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FocusRipple from 'chamel/ripples/FocusRipple';

/**
 * Test rendering the FocusRipple
 */
describe("FocusRipple Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FocusRipple
        show={true}
      />
    );

    expect(renderedDocument.props.children.type).toBe("div");
  });
});
