import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Switch from 'chamel/Toggle/Switch';

/**
 * Test rendering the Switch
 */
describe("Switch Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Switch
        classNames="jest-test"
        label="jest-Switch"
        show={true}
        touch={true}
      />
    );

    expect(renderedDocument.type).toBe("div")
    expect(renderedDocument.props.children.length).toBeGreaterThan(0);
  });
});
