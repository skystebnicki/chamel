import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ToolbarGroup from 'chamel/Toolbar/ToolbarGroup';

/**
 * Test rendering the ToolbarGroup
 */
describe("ToolbarGroup Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

  });    const renderer = new ReactShallowRenderer();
  const renderedDocument = renderer.render(
    <ToolbarGroup
      align="left">
      <div>{"Toolbars Here"}</div>
    </ToolbarGroup>
  );

  expect(renderedDocument.props.children.type).toBe('div');

});
