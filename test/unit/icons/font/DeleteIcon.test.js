import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DeleteIcon from 'chamel/icons/font/DeleteIcon';

/**
 * Test rendering the DeleteIcon
 */
describe("DeleteIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DeleteIcon/>
    );

    expect(renderedDocument.props.children).toBe('delete');
  });
});
