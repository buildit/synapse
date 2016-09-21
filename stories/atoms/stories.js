import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Button from '../../src/js/components/1-atoms/Button.jsx';
import { WithNotes } from '@kadira/storybook-addon-notes';
import '../../src/less/main.less';

storiesOf('atoms.Button', module)
  // .addDecorator((story) => (
  //   <div style={{textAlign: 'center'}}>
  //     {story()}
  //   </div>
  // ))
  .add('primary enabled', () => (
    <WithNotes notes={'Here is how our default button enabled looks like. Isn\'t it look nice?'}>
      <Button
        label="Primary Enabled"
        cssClasses="button btn btn-primary"
        onClick=""
      />
    </WithNotes>
  ))
  .add('primary disabled', () => (
    <WithNotes notes={'Here is how our default button disabled looks like. Isn\'t it look nice?'}>
      <Button
        label="Primary Disabled"
        cssClasses="button btn btn-primary"
        onClick=""
        disabled="true"
      />
    </WithNotes>
  ))
  .add('secondary', () => (
    <WithNotes notes={'Here is how our default button enabled looks like. Isn\'t it look nice?'}>
      <Button
        label="Secondary"
        cssClasses="button btn btn-secondary"
        onClick=""
      />
    </WithNotes>
  ))
  .add('info', () => (
    <WithNotes notes={'Here is how our default button enabled looks like. Isn\'t it look nice?'}>
      <Button
        label="Info"
        cssClasses="button btn btn-info"
        onClick=""
      />
    </WithNotes>
  ))
  .add('success', () => (
    <WithNotes notes={'Here is how our default button enabled looks like. Isn\'t it look nice?'}>
      <Button
        label="Success"
        cssClasses="button btn btn-success"
        onClick=""
      />
    </WithNotes>
  ))
  .add('danger', () => (
    <WithNotes notes={'Here is how our default button enabled looks like. Isn\'t it look nice?'}>
      <Button
        label="Danger"
        cssClasses="button btn btn-danger"
        onClick=""
      />
    </WithNotes>
  ));
