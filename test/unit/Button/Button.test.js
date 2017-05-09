import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Button from 'chamel/Button';

/**
 * Test rendering the Button
 */
describe("Button Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Button
        label="test label"
      />
    );
    expect(renderedDocument.props.children).toBe('test label');
    expect(renderedDocument.type).toBe('button');
  });
});
