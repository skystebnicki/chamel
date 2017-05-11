import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import LabelIcon from 'chamel/icons/font/LabelIcon';

/**
 * Test rendering the LabelIcon
 */
describe("LabelIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <LabelIcon/>
    );

    expect(renderedDocument.props.children).toBe('label');
  });
});
