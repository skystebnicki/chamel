import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ListBulletedIcon from 'chamel/icons/font/ListBulletedIcon';

/**
 * Test rendering the ListBulletedIcon
 */
describe("ListBulletedIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <ListBulletedIcon/>
    );

    expect(renderedDocument.props.children).toBe('format_list_bulleted');
  });
});
