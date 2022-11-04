import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Row, Card, Column, Form, Button} from './widgets';

//type Message = { line: { from: { x: number; y: number }; to: { x: number; y: number } } };

export class MessageBoard extends Component {
  connection: WebSocket | null = null;
  Messages: string[] =[''];
  Users: string[] = [];
  Message: string ='';
  User: string = '';

  connected = false;

render() {
return (
    <div>
        <Row>
            <Column width={4}>
                    <Form.Label>Bruker:</Form.Label>
                    <Form.Input value={this.User} type='text' onChange={(event) => {                        this.User = event.currentTarget.value;
                }}></Form.Input> 
            </Column>
            <Column>
                <Button.Success onClick={() => {
                    this.Users.push(this.User)
                }}>Legg til bruker</Button.Success>
            </Column>
        </Row>


        <Card title={this.connected? "Connected": "not connected"}>

            <Card title="">
                {this.Messages.map((message) =>
                    <Row key={this.Messages.indexOf(message)}>
                        {message}
                      </Row>
                    )}
            </Card>

            <Card title={"New message"}>
                <Row>

                    <Column width={3}>
                        <Button.Success onClick={() => {
                            this.Users.push(this.User)
                            this.connection?.send(this.User+": "+this.Message)
                        }}>Send</Button.Success>
                    </Column>

                    <Column>
                        <Form.Input type='text' value={this.Message} onChange={(event) => {
                        this.Message = event.currentTarget.value
                        }}></Form.Input>
                    </Column>

                </Row>
            </Card>
        </Card>  
    </div>   
    )
}

  mounted() {
    // Connect to the websocket server
    this.connection = new WebSocket('ws://localhost:3000/api/v1/whiteboard');

    // Called when the connection is ready
    this.connection.onopen = () => {
      this.connected = true;
    };

    // Called on incoming message
    this.connection.onmessage = (message) => {
        this.Messages.push(message.data);
    };

    // Called if connection is closed
    this.connection.onclose = (event) => {
      this.connected = false;
      Alert.danger('Connection closed with code ' + event.code + ' and reason: ' + event.reason);
    };

    // Called on connection error
    this.connection.onerror = () => {
      this.connected = false;
      Alert.danger('Connection error');
    };
  }

  // Close websocket connection when component is no longer in use
  beforeUnmount() {
    this.connection?.close();
  }
}