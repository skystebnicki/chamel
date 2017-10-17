import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import DropDownIcon from 'chamel/DropDownIcon';

/**
 * Test rendering the Drop Down Icon
 */
describe("Drop Down Icon Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <DropDownIcon
        menuItems={[{payload: 1, text: "1", payload: 2, text: "2"}]}
        selectedIndex={1}
      />
    );

    expect(typeof renderedDocument.props).toBe('object');
    expect(renderedDocument.type).toBe('div');
  });
});
