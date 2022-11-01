import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button } from './widgets';
import { NavLink } from 'react-router-dom';
import taskService, { Task } from './task-service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders task list.
 */
export class TaskList extends Component {
  tasks: Task[] = [];

  render() {
    return (
      <>
        <Card title="Tasks">
          {this.tasks.map((task) => (
            <Row key={task.id}>
              <Column>
                <NavLink to={'/tasks/' + task.id}>{task.title}</NavLink>
              </Column>
            </Row>
          ))}
        </Card>
        <Button.Success onClick={() => history.push('/tasks/new')}>New task</Button.Success>
      </>
    );
  }

  mounted() {
    taskService
      .getAll()
      .then((tasks) => (this.tasks = tasks))
      .catch((error) => Alert.danger('Error getting tasks: ' + error.message));
  }
}

/**
 * Renders a specific task.
 */
export class TaskDetails extends Component<{ match: { params: { id: number } } }> {
  task: Task = { id: 0, title: '', done: false, description: '' };

  render() {
    return (
      <>
        <Card title="Task">
          <Row>
            <Column width={2}>Title:</Column>
            <Column>{this.task.title}</Column>
          </Row>
          <Row>
            <Column width={2}>Description:</Column>
            <Column>{this.task.description}</Column>
          </Row>
          <Row>
            <Column width={2}>Done:</Column>
            <Column>
              <Form.Checkbox checked={this.task.done} onChange={() => {}} disabled />
            </Column>
          </Row>
        </Card>
        <Button.Success
          onClick={() => history.push('/tasks/' + this.props.match.params.id + '/edit')}
        >
          Edit
        </Button.Success>
      </>
    );
  }

  mounted() {
    taskService
      .get(this.props.match.params.id)
      .then((task) => (this.task = task))
      .catch((error) => Alert.danger('Error getting task: ' + error.message));
  }
}

/**
 * Renders form to edit a specific task.
 */
export class TaskEdit extends Component<{ match: { params: { id: number } } }> {
  task: Task = { id: 0, title: '', done: false, description: '' };

  render() {
    return (
      <>
        <Card title="Edit task">
          <Row>
            <Column width={2}>
              <Form.Label>Title:</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.task.title}
                onChange={(event) => (this.task.title = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Description:</Form.Label>
            </Column>
            <Column>
              <Form.Textarea 
                type="text"
                value={this.task.description} 
                onChange={(event) => {
                  this.task.description = event.currentTarget.value
                }} 
                rows={10} 
                />
            </Column>
          </Row>
          <Row>
            <Column width={2}>Done:</Column>
            <Column>
              <Form.Checkbox
                checked={this.task.done}
                onChange={(event) => (this.task.done = event.currentTarget.checked)}
              />
            </Column>
          </Row>
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={() => 
              taskService.update(this.task).then(() => history.push("/tasks"))
            }
            
            >Save</Button.Success>
          </Column>
          <Column right>
            <Button.Danger onClick={() => 
              taskService.delete(this.task.id).then(() => history.push('/tasks'))
            }
            >Delete</Button.Danger>
          </Column>
        </Row>
      </>
    );
  }

  mounted() {
    taskService
      .get(this.props.match.params.id)
      .then((task) => (this.task = task))
      .catch((error) => Alert.danger('Error getting task: ' + error.message));
  }
}

/**
 * Renders form to create new task.
 */
export class TaskNew extends Component {
  title = '';
  description = '';

  render() {
    return (
      <>
        <Card title="New task">
          <Row>
            <Column width={2}>
              <Form.Label>Title:</Form.Label>
            </Column>
            <Column>
              <Form.Input
                type="text"
                value={this.title}
                onChange={(event) => (this.title = event.currentTarget.value)}
              />
            </Column>
          </Row>
          <Row>
            <Column width={2}>
              <Form.Label>Description:</Form.Label>
            </Column>
            <Column>
              <Form.Textarea 
              value={this.description} 
              onChange={(event) => {
                this.description = event.currentTarget.value
              }} 
              rows={10} 
              />
            </Column>
          </Row>
        </Card>
        <Button.Success
          onClick={() => {
            taskService
              .create(this.title, this.description)
              .then((id) => history.push('/tasks/' + id))
              .catch((error) => Alert.danger('Error creating task: ' + error.message));
          }}
        >
          Create
        </Button.Success>
      </>
    );
  }
}
