import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AppBarRightToolbar from 'chamel/AppBar/AppBarRightToolbar';

/**
 * Test rendering the AppBarRightToolbar
 */
describe("AppBarRightToolbar Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AppBarRightToolbar
        className={'test-class-name'}>
      </AppBarRightToolbar>
    );

    expect(renderedDocument.type).toBe('div');
    expect(renderedDocument.props.className).toBe('test-class-name');
  });
});
