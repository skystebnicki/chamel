import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ContactsIcon from 'chamel/icons/font/ContactsIcon';

/**
 * Test rendering the AppsIcon
 */
describe("ContactsIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ContactsIcon/>
    );

    expect(renderedDocument.props.children).toBe('contacts');
  });
});
