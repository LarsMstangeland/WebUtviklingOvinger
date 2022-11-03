import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import { NavBar, Card, Alert, Form, Row, Button, Column } from './widgets';
import { TaskList, TaskDetails, TaskEdit, TaskNew } from './task-components';
import taskService from './task-service';

class Menu extends Component {
  render() {
    return (
      <NavBar brand="Todo App">
        <NavBar.Link to="/tasks">Tasks</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {

  input: string = '';
  outputerror: string= '';
  outputgood: string = '';



  render() {
    return (
    <Card title="Welcome">This is a Code App
      <Row>
        <Form.Textarea rows={8} value={this.input} type={"text"} onChange={(event) => {

          this.input = event.currentTarget.value

        }}></Form.Textarea>
      </Row>
      <Row>
        <Button.Success
            onClick={() => {
              
              //console.info(this.input)

              taskService.run(this.input)
              .then((response) => {
                this.outputgood = response.data.stdout;
                this.outputerror = response.data.stderr;
              })
              /*
                .create(this.title)
                .then((id) => history.push('/tasks/' + id))
                .catch((error) => Alert.danger('Error Running code: '));
                */
            }}
          >
            Create
          </Button.Success>
      </Row>
      <Row>
          <Card title={"Result"}>
            <Column width={10}>No code here yet: {this.outputgood} </Column>
          </Card>
      </Row>
      <Row>
          <Card title={"Error"}>
            <Column width={10}>No code here yet: {this.outputerror}</Column>
          </Card>
      </Row>    
    </Card>);
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Alert />
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/tasks" component={TaskList} />
      <Route exact path="/tasks/:id(\d+)" component={TaskDetails} /> {/* id must be number */}
      <Route exact path="/tasks/:id(\d+)/edit" component={TaskEdit} /> {/* id must be number */}
      <Route exact path="/tasks/new" component={TaskNew} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
