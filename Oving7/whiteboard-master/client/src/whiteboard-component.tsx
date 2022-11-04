import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from './widgets';

type Message = { line: { from: { x: number; y: number }; to: { x: number; y: number } } };

export class Whiteboard extends Component {
  canvas: HTMLCanvasElement | null = null;
  lastPos: { x: number; y: number } | null = null;
  connection: WebSocket | null = null;
  connected = false;

  render() {
    return (
      <>
        <canvas
          ref={(e) => (this.canvas = e) /* Store canvas element */}
          onMouseMove={(event) => {
            // Send lines to Whiteboard server
            const pos = { x: event.clientX, y: event.clientY };
            if (this.lastPos && this.connected) {
              this.connection?.send(JSON.stringify({ line: { from: this.lastPos, to: pos } }));
            }
            this.lastPos = pos;
          }}
          width={400}
          height={400}
          style={{ border: '2px solid black' }}
        />
        <div>{this.connected ? 'Connected' : 'Not connected'}</div>
      </>
    );
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
      const context = this.canvas?.getContext('2d');
      context?.beginPath();
      const data: Message = JSON.parse(message.data);
      context?.moveTo(data.line.from.x, data.line.from.y);
      context?.lineTo(data.line.to.x, data.line.to.y);
      context?.closePath();
      context?.stroke();
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
