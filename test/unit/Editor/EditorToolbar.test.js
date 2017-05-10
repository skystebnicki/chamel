import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import EditorToolbar from 'chamel/Editor/EditorToolbar';

/**
 * Test rendering the EditorToolbar
 */
describe("EditorToolbar Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <EditorToolbar/>
    );

    expect(renderedDocument.type).toBe('div');
  });
});
