import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import NoteIcon from 'chamel/icons/font/NoteIcon';

/**
 * Test rendering the NoteIcon
 */
describe("NoteIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <NoteIcon/>
    );

    expect(renderedDocument.props.children).toBe('note');
  });
});
