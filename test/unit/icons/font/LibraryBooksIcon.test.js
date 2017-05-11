import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import LibraryBooksIcon from 'chamel/icons/font/LibraryBooksIcon';

/**
 * Test rendering the LibraryBooksIcon
 */
describe("LibraryBooksIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <LibraryBooksIcon/>
    );

    expect(renderedDocument.props.children).toBe('library_books');
  });
});
