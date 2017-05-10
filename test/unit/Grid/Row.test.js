import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Row from 'chamel/Grid/Row';

/**
 * Test rendering the Row
 */
describe("Row Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Row/>
    );
    
    expect(renderedDocument.type).toBe('div');
  });
});
