import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import LinearProgress from 'chamel/Progress/LinearProgress';

/**
 * Test rendering the LinearProgress
 */
describe("LinearProgress Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <LinearProgress
        value={'test value'}
      />
    );
    
    expect(renderedDocument.props.type).toBe('linear');
    expect(renderedDocument.props.value).toBe('test value');

  });
});
