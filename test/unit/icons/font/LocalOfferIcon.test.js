import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import LocalOfferIcon from 'chamel/icons/font/LocalOfferIcon';

/**
 * Test rendering the LocalOfferIcon
 */
describe("LocalOfferIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <LocalOfferIcon/>
    );

    expect(renderedDocument.props.children).toBe('local_offer');
  });
});
