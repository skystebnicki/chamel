import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AccessibilityIcon from 'chamel/icons/font/AccessibilityIcon';

/**
 * Test rendering the AccessibilityIcon
 */
describe("AccessibilityIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AccessibilityIcon/>
    );
    
    expect(renderedDocument.props.children).toBe('accessibility');
  });
});
