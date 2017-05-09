import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import CircularProgress from 'chamel/Progress/CircularProgress';

/**
 * Test rendering the CircularProgress
 */
describe("CircularProgress Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <CircularProgress
        value={'test value'}
      />
    );

    expect(renderedDocument.props.type).toBe('circular');
    expect(renderedDocument.props.value).toBe('test value');

  });
});
