import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AccessTimeIcon from 'chamel/icons/font/AccessTimeIcon';

/**
 * Test rendering the AccessTimeIcon
 */
describe("AccessTimeIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AccessTimeIcon/>
    );
    
    expect(renderedDocument.props.children).toBe('access_time');
  });
});
