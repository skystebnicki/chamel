import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Progress from 'chamel/Progress';

/**
 * Test rendering the Progress
 */
describe("Progress Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Progress
        value={100}
      />
    );

    expect(renderedDocument.props.type).toBe('linear');
    expect(renderedDocument.props.value).toBe(100);

  });
});
