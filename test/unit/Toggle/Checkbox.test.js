import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Checkbox from 'chamel/Toggle/Checkbox';

/**
 * Test rendering the Checkbox
 */
describe("Checkbox Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Checkbox
        classNames="jest-test"
        label="jest-Checkbox"
        show={true}
        touch={true}
      />
    );

    expect(renderedDocument.type).toBe("div")
    expect(renderedDocument.props.children.length).toBeGreaterThan(0);
  });
});
