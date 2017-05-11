import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SettingsIcon from 'chamel/icons/font/SettingsIcon';

/**
 * Test rendering the SettingsIcon
 */
describe("SettingsIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SettingsIcon/>
    );

    expect(renderedDocument.props.children).toBe('settings');
  });
});
