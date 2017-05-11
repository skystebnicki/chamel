import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ExpandMoreIcon from 'chamel/icons/font/ExpandMoreIcon';

/**
 * Test rendering the ExpandMoreIcon
 */
describe("ExpandMoreIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ExpandMoreIcon/>
    );

    expect(renderedDocument.props.children).toBe('expand_more');
  });
});
