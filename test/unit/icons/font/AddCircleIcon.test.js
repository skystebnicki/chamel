import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AddCircleIcon from 'chamel/icons/font/AddCircleIcon';

/**
 * Test rendering the AddCircleIcon
 */
describe("AddCircleIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AddCircleIcon/>
    );

    expect(renderedDocument.props.children).toBe('add_circle');
  });
});
