import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      messages: [],
    }
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.addEventListener('message', event => {
      this.setState({ messages: this.state.messages.concat(event.data) })
    });
  }

  componentWillUnmount() {
    this.socket.close()
  }

  sendMessage(e) {
    e.preventDefault()

    fetch('http://localhost:5000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ message: this.state.message })
    })

    this.setState({ message: '' })

    this.lastMessageDom.scrollIntoView();
  }

  render() {
    return (
      <div className="chat-application">
        <div className="chat-container">
          <div className="chatbox">
            <ul>
              { this.state.messages.map(message => {
                return <li>{message}</li>
              })}
              <li style={{ marginBottom: 30 }} ref={(el) => { this.lastMessageDom = el; }}></li>
            </ul>
          </div>
          <div className="chat-input">
            <form onSubmit={e => this.sendMessage(e)}>
              <input
                value={this.state.message}
                onChange={e => this.setState({message: e.target.value})} type="text"
              />
            </form>
          </div>
        </div>
        <div className="sidebar">
          <ul className="user-list">
            <li>max goyette</li>
            <li>zergov</li>
            <li>smoll</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
