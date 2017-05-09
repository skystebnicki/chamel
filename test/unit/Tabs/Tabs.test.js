import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Tabs from 'chamel/Tabs/Tabs';
import Tab from 'chamel/Tabs/Tab';

/**
 * Test rendering the Tabs
 */
describe("Tabs Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Tabs
        secondary={true}
        initialSelectedIndex={1}
        tabWidth={100}>
        <Tab
          selected={true}
          width="100px"
        />
      </Tabs>
    );

    expect(renderedDocument.type).toBe("div")
    expect(renderedDocument.props.children.length).toBeGreaterThan(0);
  });
});
