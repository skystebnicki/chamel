import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AutoComplete from 'chamel/AutoComplete';

/**
 * Test rendering the AutoComplete
 */
describe("AutoComplete Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AutoComplete
        delimiter="test"
      />
    );

    expect(typeof renderedDocument.props).toBe('object');
    expect(renderedDocument.type).toBe('div');
  });
});
