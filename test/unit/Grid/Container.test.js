import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Container from 'chamel/Grid/Container';

/**
 * Test rendering the Container
 */
describe("Container Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Container/>
    );
    
    expect(renderedDocument.type).toBe('div');
  });
});
