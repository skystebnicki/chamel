import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Slider from 'chamel/Slider/Slider';

/**
 * Test rendering the Slider
 */
describe("Slider Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Slider
        description="jest-test"
        name="jest-Slider"
      />
    );

    expect(renderedDocument.type).toBe("div")
    expect(renderedDocument.props.className).toBe("chamel-input");
  });
});
