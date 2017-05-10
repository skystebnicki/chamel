import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ContentHtml from 'chamel/Editor/ContentHtml';

/**
 * Test rendering the ContentHtml
 */
describe("ContentHtml Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ContentHtml
        value={'content string here'}
      />
    );
    
    expect(renderedDocument.type).toBe('div');
  });
});
