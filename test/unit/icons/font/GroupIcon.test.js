import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import GroupIcon from 'chamel/icons/font/GroupIcon';

/**
 * Test rendering the GroupIcon
 */
describe("GroupIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <GroupIcon/>
    );

    expect(renderedDocument.props.children).toBe('group');
  });
});
