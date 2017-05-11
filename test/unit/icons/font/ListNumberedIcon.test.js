import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ListNumberedIcon from 'chamel/icons/font/ListNumberedIcon';

/**
 * Test rendering the ListNumberedIcon
 */
describe("ListNumberedIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ListNumberedIcon/>
    );

    expect(renderedDocument.props.children).toBe('format_list_numbered');
  });
});
