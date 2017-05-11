import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import AnnouncementIcon from 'chamel/icons/font/AnnouncementIcon';

/**
 * Test rendering the AnnouncementIcon
 */
describe("AnnouncementIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <AnnouncementIcon/>
    );

    expect(renderedDocument.props.children).toBe('announcement');
  });
});
