import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import SlideIn from 'chamel/transition-groups/SlideIn';

/**
 * Test rendering the SlideIn
 */
describe('SlideIn Component', () => {
  // Basic validation that render works in edit mode and returns children
  it('Should render', () => {
    const renderer = new ReactShallowRenderer();
    const renderedDocument = renderer.render(
      <SlideIn className="jest-test" direction="up" enterDelay={100}>
        <div>{'Something to side in'}</div>
      </SlideIn>,
    );

    expect(renderedDocument.props.className).toBe(
      'jest-test chamel-transition-slide-in chamel-is-up',
    );
    expect(renderedDocument.props.component).toBe('div');
    expect(renderedDocument.props.classNames).toBe('chamel-transition-slide-in');
  });
});
