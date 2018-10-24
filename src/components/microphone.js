import React, { Component } from 'react'
import { ReactMic } from 'react-mic';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import '../assets/css/microphone.css';
import Modal from 'react-modal';
import CategoryModal from './category_modal';
import applauseTrack from '../assets/audio/applause.mp3';
import laughTrack from '../assets/audio/laugh.mp3';
import { getUserID } from '../actions';

const customStyles = {
  content : {
    width                 : '80%',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height: '40%',
    backgroundColor: 'grey',
    borderRadius: '20px'
  }
};

class Microphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      modalIsOpen: false,
      audiofile: '',
      blobfile: '',
      recording: '',
      category: 'comedy',
      audio_name: '',
      error: ''
    }

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  startRecording(){
    this.setState({
      record: true
    });
  }
 
  stopRecording(){
    this.setState({
      record: false
    });
  }
 
  onData(recordedBlob) {
  }
 
  onStop(recordedBlob) {
    var blob = recordedBlob.blob;
    var audioFile = new File([blob], "music2.mp3", {
      type: "audio/mp3"
    });
    this.setState({
      audiofile: audioFile,
      blobfile: recordedBlob
    })
  }

async postRecording (e) {
  e.preventDefault();
  if(this.state.audio_name) {
    var form = new FormData();
    form.set('audio', this.state.audiofile);
    form.set('audio_name', this.state.audio_name)
    form.set('id', this.state.audio_name);
    form.set('user_id', this.props.user.id.data.data[0].id);
    form.set('author_name', this.props.user.userInfo.username);
  
    await axios({
      method: 'post',
      url: '/api/stand_app.php?action=add_item',
      data: form, 
      config: { headers: {'Content-Type': 'multipart/form-data' }}   
    }).then(function(response) {
      
    });
  
    this.closeModal();
  } else {
    this.setState({
      error: 'Please add title'
    })
  }
}

  openModal() {
    this.pauseEffect();
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  selectCategory = (string) => {
    if(string === 'comedy') {
      this.audio = new Audio(laughTrack);
      return;
    } else {
      this.audio = new Audio(applauseTrack);
      this.setState ({
        category: 'others'
      })
    }
  }

  playEffect () {
    this.audio.play();
  }

  pauseEffect () {
    this.audio.pause();
  }

  async handleInputChange (e) {
    const {name, value} = e.target;

    await this.setState({
        [name]: value,
    })
  }

  render() {

    return (
      <div className='microphone'>
      <Link to='/'><i className="fas fa-chevron-left fa-2x" onClick={this.pauseEffect.bind(this)}></i></Link>
        <CategoryModal select={this.selectCategory}/>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop.bind(this)}
          strokeColor="#FFFFFF"
          backgroundColor="black"
        />
        <div className='record-controls text-center'>
            <span className={!this.state.record ? 'fa-stack fa-2x' : 'd-none'} onClick={this.startRecording}>
              <i className="far fa-circle fa-stack-2x"></i>
              <i className="fas fa-circle fa-stack-1x fa-inverse inner-record"/>
            </span>
            <i className={!this.state.record ? 'd-none' : "far fa-stop-circle fa-4x"} onClick={(event) => { this.stopRecording(); this.openModal()}}/>
        </div>
        <div className='effect-button'>
        
          {
            (this.state.category === 'comedy') ?
              <i className="fas fa-laugh-squint fa-4x" onClick={this.playEffect.bind(this)}/>
              :
              <i className="fas fa-hands fa-4x" onClick={this.playEffect.bind(this)}/>
          }

          <label className='speaker-text'>Audience Button</label>
        </div>
        <div id="bubbles">
            <div className="bubble x1"></div>
            <div className="bubble x2"></div>
            <div className="bubble x3"></div>
            <div className="bubble x4"></div>
            <div className="bubble x5"></div>
        </div>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
          <div className='container'>
            <div className='recording-completed-title' ref={subtitle => this.subtitle = subtitle}>Completed Recording</div>
            <div className='center-align'>
              <div className='d-flex justify-content-center'>

                <div className="title-input-container">
                  <label>{this.state.error || 'Title'}</label>
                  <input name='audio_name' type="text" className="form-control text-center" placeholder="Enter recording title" value={this.state.audio_name} onChange={this.handleInputChange.bind(this)}/>
                </div>
                
              </div>
              <div className='recorded-audio-player d-flex justify-content-center'>
                <audio controls>
                  <source src={this.state.blobfile.blobURL} type="audio/webm"/>
                </audio>
              </div>
              <div className='post-controls d-flex justify-content-center'>
                <button className='btn btn-dark' onClick={this.closeModal.bind(this)}><i className="fas fa-trash-alt fa-2x"/></button>
                <button className='btn btn-warning' onClick={(e) => {this.postRecording(e)}}><i className="fas fa-sign-in-alt fa-2x"/></button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {getUserID})(Microphone);