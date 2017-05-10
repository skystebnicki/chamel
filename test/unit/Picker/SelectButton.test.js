import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SelectButton from 'chamel/Picker/SelectButton';

/**
 * Test rendering the SelectButton
 */
describe("SelectButton Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SelectButton
        menuItems={[{payload:1, text: 1}]}
      />
    );
    
    expect(renderedDocument.type).toBe('div');

  });
});
