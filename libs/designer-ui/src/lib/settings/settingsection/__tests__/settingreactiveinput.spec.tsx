import type { ReactiveToggleProps } from '../settingreactiveinput';
import { ReactiveToggle } from '../settingreactiveinput';
import React from 'react';
import * as ReactShallowRenderer from 'react-test-renderer/shallow';

describe('ui/settings/settingreactiveinput', () => {
  let minimal: ReactiveToggleProps, renderer: ReactShallowRenderer.ShallowRenderer;

  beforeEach(() => {
    minimal = {
      textFieldId: 'id1',
      readOnly: false,
      textFieldLabel: 'text field label',
      textFieldValue: 'test',
      checked: false,
      onText: 'On',
      offText: 'Off',
      onValueChange: () => null,
    };
    renderer = ReactShallowRenderer.createRenderer();
  });

  afterEach(() => {
    renderer.unmount();
  });

  it('should construct', () => {
    const settingToggle = renderer.render(<ReactiveToggle {...minimal} />);
    expect(settingToggle).toMatchSnapshot();
  });

  it('should have child text field with correct value', () => {
    const props: ReactiveToggleProps = { ...minimal, checked: true };
    renderer.render(<ReactiveToggle {...props} />);

    const reactiveToggle = renderer.getRenderOutput();
    const [toggle, textFieldContainer]: any[] = React.Children.toArray(reactiveToggle.props.children);

    expect(toggle.props.checked).toBeTruthy();
    console.log(textFieldContainer);
    const [textField]: any[] = React.Children.toArray(textFieldContainer.props.children);
    expect(textField.props.id).toBe(minimal.textFieldId);
    expect(textField.props.value).toBe(minimal.textFieldValue);
  });
});
