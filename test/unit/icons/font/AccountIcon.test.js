import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AccountIcon from 'chamel/icons/font/AccountIcon';

/**
 * Test rendering the AccountIcon
 */
describe("AccountIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AccountIcon/>
    );

    expect(renderedDocument.props.children).toBe('account_box');
  });
});
