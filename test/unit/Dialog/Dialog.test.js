import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Dialog from 'chamel/Dialog';

/**
 * Test rendering the Dialog
 */
describe("Dialog Component", () => {

  // Basic validation that render works in edit mode and returns children
  it("Should render", () => {

    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <Dialog
        title={'test title'}
      />
    );

    expect(renderedDocument.type).toBe('div');
  });
});
