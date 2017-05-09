import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Tab from 'chamel/Tabs/Tab';

/**
 * Test rendering the Tab
 */
describe("Tab Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Tab
        secondary={true}
        selected={true}
        width="100px"
      />
    );

    expect(renderedDocument.type).toBe("div")
    expect(renderedDocument.props.style.width).toBe("100px");
  });
});
