import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TextFieldRich from 'chamel/TextFieldRich/TextFieldRich';

/**
 * Test rendering the TextFieldRich
 */
describe("TextFieldRich Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <TextFieldRich
        value="jest-test"
        id="jest-TextFieldRich"
      />
    );

    expect(renderedDocument.props.className).toBe('chamel-text-field-rich');
  });
});
