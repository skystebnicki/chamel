import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import LinkMenuItem from 'chamel/Menu/LinkMenuItem';

/**
 * Test rendering the Menu
 */
describe("LinkMenuItem Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <LinkMenuItem
        index={0}
        payload={'test'}
        text={'test'}
        />
    );
    
    expect(renderedDocument.key).toBe('0');
    expect(renderedDocument.props.children).toBe('test');
    expect(renderedDocument.props.className).toBe('chamel-menu-item');

  });
});
