import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import RadioButton from 'chamel/Picker/RadioButton';

/**
 * Test rendering the RadioButton
 */
describe("RadioButton Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <RadioButton/>
    );
    
    expect(renderedDocument.type).toBe('label');

  });
});
