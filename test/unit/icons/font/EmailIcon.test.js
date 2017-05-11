import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import EmailIcon from 'chamel/icons/font/EmailIcon';

/**
 * Test rendering the AppsIcon
 */
describe("EmailIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <EmailIcon/>
    );

    expect(renderedDocument.props.children).toBe('mail_outline');
  });
});
