import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import FontIcon from 'chamel/FontIcon';

/**
 * Test rendering the FontIcon
 */
describe("FontIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <FontIcon
        className={'test FontIcon className'}
      />
    );

    expect(renderedDocument.props.className).toBe('test FontIcon className');
    expect(renderedDocument.type).toBe('span');
  });
});
