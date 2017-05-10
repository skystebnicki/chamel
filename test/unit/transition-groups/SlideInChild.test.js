import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SlideInChild from 'chamel/transition-groups/SlideInChild';

/**
 * Test rendering the SlideInChild
 */
describe("SlideInChild Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SlideInChild />
    );

    expect(renderedDocument.props.className).toBe('chamel-transition-slide-in-child');
  });
});
