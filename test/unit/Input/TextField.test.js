import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TextField from 'chamel/Input/TextField';

/**
 * Test rendering the TextField
 */
describe("TextField Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <TextField/>
    );
    
    expect(renderedDocument.type).toBe('div');
  });
});
