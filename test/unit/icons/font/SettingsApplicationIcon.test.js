import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SettingsApplicationIcon from 'chamel/icons/font/SettingsApplication';

/**
 * Test rendering the SettingsApplicationIcon
 */
describe("SettingsApplicationIcon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SettingsApplicationIcon/>
    );

    expect(renderedDocument.props.children).toBe('settings_applications');
  });
});
