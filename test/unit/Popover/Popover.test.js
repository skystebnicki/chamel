import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Popover from 'chamel/Popover';

/**
 * Test rendering the SelectButton
 */
describe("Popover Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Popover
        relative={true}
      />
    );

    expect(renderedDocument.type).toBe('div');

  });
});
