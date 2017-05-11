import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AddIcon from 'chamel/icons/font/AddIcon';

/**
 * Test rendering the AddIcon
 */
describe("AddIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AddIcon/>
    );

    expect(renderedDocument.props.children).toBe('add');
  });
});
