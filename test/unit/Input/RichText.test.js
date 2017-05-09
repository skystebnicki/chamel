import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import RichText from 'chamel/Input/RichText';

/**
 * Test rendering the RichText
 */
describe("RichText Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <RichText/>
    );
    
    expect(renderedDocument.type).toBe('div');
  });
});
