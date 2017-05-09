import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ListDivider from 'chamel/List/ListDivider';

/**
 * Test rendering the ListDivider
 */
describe("ListDivider Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ListDivider/>
    );

    expect(renderedDocument.type).toBe('div');
  });
});
