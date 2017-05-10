import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import MenuItem from 'chamel/Menu/MenuItem';

/**
 * Test rendering the MenuItem
 */
describe("MenuItem Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <MenuItem
        index={0}
        />
    );
    
    expect(renderedDocument.key).toBe('0');
    expect(renderedDocument.type).toBe('div');

  });
});
