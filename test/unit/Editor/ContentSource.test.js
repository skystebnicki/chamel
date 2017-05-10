import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ContentSource from 'chamel/Editor/ContentSource';

/**
 * Test rendering the ContentSource
 */
describe("ContentSource Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ContentSource
        value={'content string here'}
      />
    );

    expect(renderedDocument.type).toBe('div');
  });
});
