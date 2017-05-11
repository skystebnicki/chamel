import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DashboardIcon from 'chamel/icons/font/DashboardIcon';

/**
 * Test rendering the DashboardIcon
 */
describe("DashboardIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DashboardIcon/>
    );

    expect(renderedDocument.props.children).toBe('dashboard');
  });
});
