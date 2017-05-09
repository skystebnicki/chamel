import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SubheaderMenuItem from 'chamel/Menu/SubheaderMenuItem';

/**
 * Test rendering the SubheaderMenuItem
 */
describe("SubheaderMenuItem Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SubheaderMenuItem
        index={0}
        text={'test text'}
        />
    );
    
    expect(renderedDocument.props.children).toBe('test text');
    expect(renderedDocument.type).toBe('div');

  });
});
