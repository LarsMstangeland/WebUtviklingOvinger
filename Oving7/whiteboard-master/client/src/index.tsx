import ReactDOM from 'react-dom';
import * as React from 'react';
import { Whiteboard } from './whiteboard-component';
import { Alert } from './widgets';

ReactDOM.render(
  <>
    <Alert />
    <Whiteboard />
  </>,
  document.getElementById('root')
);
