import React from 'react';
import { render } from 'react-dom';
import Button from './components/1-atoms/button';

render(<Button label={"Click me"} onClick={() => {
  console.log('clicked!');
}} />, document.getElementById('app'));
