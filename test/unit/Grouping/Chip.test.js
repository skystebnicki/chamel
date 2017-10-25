import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Chip from 'chamel/Grouping/Chip';

/**
 * Test rendering the Row
 */
describe("Chip Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Chip>{"Test Chip"}</Chip>
    );

    expect(renderedDocument.type).toBe('div');
  });
});
