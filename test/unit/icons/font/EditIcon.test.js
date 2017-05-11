import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import EditIcon from 'chamel/icons/font/EditIcon';

/**
 * Test rendering the AppsIcon
 */
describe("EditIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <EditIcon/>
    );

    expect(renderedDocument.props.children).toBe('edit');
  });
});
