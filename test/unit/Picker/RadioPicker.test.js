import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import RadioPicker from 'chamel/Picker/RadioPicker';

/**
 * Test rendering the RadioPicker
 */
describe("RadioPicker Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <RadioPicker/>
    );
    
    expect(renderedDocument.type).toBe('div');

  });
});
