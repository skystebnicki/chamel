import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import EnhancedTextarea from 'chamel/EnhancedTextarea';

/**
 * Test rendering the EnhancedTextarea
 */
describe("EnhancedTextarea Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <EnhancedTextarea
        textareaClassName={'test textareaClassName'}
      />
    );

    expect(renderedDocument.props.className).toBe('chamel-enhanced-textarea');
    expect(renderedDocument.type).toBe('div');
  });
});
