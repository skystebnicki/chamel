import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import NestedMenuItem from 'chamel/Menu/NestedMenuItem';

/**
 * Test rendering the NestedMenuItem
 */
describe("NestedMenuItem Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <NestedMenuItem
        index={0}
        />
    );
    
    expect(renderedDocument.props.className).toBe('chamel-nested-menu-item');
    expect(renderedDocument.type).toBe('div');

  });
});
