import ReactDOM from 'react-dom';
import * as React from 'react';
import { Whiteboard } from './whiteboard-component';
import { Card, Alert, Form, Row, Button, Column } from './widgets';
import { Component } from 'react-simplified';
import { MessageBoard } from './MessageBoard';
import { HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history';



ReactDOM.render(
  <HashRouter>
 <>
    <Route exact path="" component={MessageBoard} />

  </>
  </HashRouter>,
  document.getElementById('root')
);
