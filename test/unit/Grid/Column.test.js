import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Column from 'chamel/Grid/Column';

/**
 * Test rendering the Column
 */
describe("Column Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Column/>
    );
    
    expect(renderedDocument.type).toBe('div');
  });
});
