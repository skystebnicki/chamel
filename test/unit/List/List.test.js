import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import List from 'chamel/List';

/**
 * Test rendering the List
 */
describe("List Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <List/>
    );

    expect(renderedDocument.type).toBe('div');
  });
});
