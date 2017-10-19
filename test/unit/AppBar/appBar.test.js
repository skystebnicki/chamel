import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AppBar from 'chamel/AppBar';

/**
 * Test rendering the AppBar
 */
describe('AppBar Component', () => {
  // Basic validation that render works in edit mode and returns children
  it('Should render', () => {
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AppBar fixed={true} title={'Test title'} zDepth={0} />,
    );

    expect(renderedDocument.type).toBe('div');
  });
});
