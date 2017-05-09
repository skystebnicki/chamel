
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ColorPicker from 'chamel/ColorPicker';

/**
 * Test rendering the ColorPicker
 */
describe("ColorPicker Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ColorPicker
        label="test label"
      />
    );

    expect(renderedDocument.props.className).toBe('chamel-color-picker');
    expect(renderedDocument.type).toBe('div');
  });
});
