import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Tooltip from 'chamel/Tooltip/Tooltip';

/**
 * Test rendering the Tooltip
 */
describe("Tooltip Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Tooltip
        classNames="jest-test"
        label="jest-tooltip"
        show={true}
        touch={true}
      />
    );

    expect(renderedDocument.props.className).toBe('chamel-tooltip chamel-is-shown chamel-is-touch');
  });
});
