import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ListItem from 'chamel/List/ListItem';

/**
 * Test rendering the ListDivider
 */
describe("ListItem Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ListItem/>
    );

    expect(renderedDocument.type).toBe('div');
  });
});
