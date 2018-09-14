import React, { Component } from 'react';
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import avatar from '../assets/images/avatars/4codyTuba.jpg';

 
import 'react-chat-widget/lib/styles.css';
 
// import logo from './logo.svg';
 
class Dm extends Component {
  componentDidMount() {
    addResponseMessage("Hey! Leave me some feedback :)");
  }
 
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }
 
  render() {
    return (
      <div className="App">
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={this.props.avatar}
          title="Direct Message"
          subtitle="What did you think of my performance?"
        />
      </div>
    );
  } 
}
 
export default Dm;