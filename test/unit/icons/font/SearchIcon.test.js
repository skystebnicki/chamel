import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SearchIcon from 'chamel/icons/font/SearchIcon';

/**
 * Test rendering the SearchIcon
 */
describe("SearchIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SearchIcon/>
    );

    expect(renderedDocument.props.children).toBe('search');
  });
});
