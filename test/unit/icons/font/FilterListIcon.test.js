import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FilterListIcon from 'chamel/icons/font/FilterListIcon';

/**
 * Test rendering the FilterListIcon
 */
describe("FilterListIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FilterListIcon/>
    );

    expect(renderedDocument.props.children).toBe('filter_list');
  });
});
