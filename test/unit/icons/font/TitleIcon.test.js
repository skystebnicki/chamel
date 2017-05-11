import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TitleIcon from 'chamel/icons/font/TitleIcon';

/**
 * Test rendering the TitleIcon
 */
describe("TitleIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <TitleIcon/>
    );
    
    expect(renderedDocument.type).toBe('div');
  });
});
