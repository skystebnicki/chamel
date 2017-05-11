import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ViewListIcon from 'chamel/icons/font/ViewListIcon';

/**
 * Test rendering the ViewListIcon
 */
describe("ViewListIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ViewListIcon/>
    );

    expect(renderedDocument.props.children).toBe('view_list');
  });
});
