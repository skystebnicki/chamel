import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ListItemCheckbox from 'chamel/List/ListItemCheckbox';

/**
 * Test rendering the ListItemCheckbox
 */
describe("ListItemCheckbox Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ListItemCheckbox/>
    );

    expect(renderedDocument.type).toBe('div');
  });
});
