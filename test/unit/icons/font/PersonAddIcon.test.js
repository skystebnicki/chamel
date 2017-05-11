import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import PersonAddIcon from 'chamel/icons/font/PersonAddIcon';

/**
 * Test rendering the PersonAddIcon
 */
describe("PersonAddIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <PersonAddIcon/>
    );

    expect(renderedDocument.props.children).toBe('person_add');
  });
});
