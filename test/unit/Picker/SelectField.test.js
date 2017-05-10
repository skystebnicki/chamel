import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SelectField from 'chamel/Picker/SelectField';

/**
 * Test rendering the SelectButton
 */
describe("SelectField Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SelectField
        menuItems={[{text: 'test1'}]}/>
    );

    expect(renderedDocument.type).toBe('div');

  });
});
