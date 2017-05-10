import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FloatingButton from 'chamel/Button';

/**
 * Test rendering the FloatingButton
 */
describe("FloatingButton Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FloatingButton
        label="test label"
      />
    );

    expect(renderedDocument.props.children).toBe('test label');
    expect(renderedDocument.type).toBe('button');
  });
});
