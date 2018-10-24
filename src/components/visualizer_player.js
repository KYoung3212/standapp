import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/visualizer.css';
import albumImage from '../assets/images/microphone.png'
import { connect } from 'react-redux';
import { likeAudio, unlikeAudio, getUserID, deletePost, getNewsfeed } from '../actions';
import Modal from 'react-modal';
import {
    FacebookIcon, 
    FacebookShareCount, 
    FacebookShareButton,
    TwitterShareButton,
    TwitterIcon,
    GooglePlusShareCount,
    GooglePlusShareButton,
    GooglePlusIcon,
    EmailShareButton,
    EmailIcon,
    RedditShareCount,
    RedditShareButton,
    RedditIcon,
    LinkedinShareCount,
    LinkedinShareButton,
    LinkedinIcon,
} from 'react-share';

import '../assets/css/shareButtons.css'

const customStyles = {
    content : {
      width                 : '80%',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height: '30%',
      backgroundColor: 'grey',
      borderRadius: '20px'
    }
};

class VisualizerPlayer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            buffer: null,
            duration: 0,
            tracks: this.props.audio,
            playing: false,
            modalIsOpen: false,
            liked: this.props.audio.liked
        }
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    avatarImage = {
        backgroundImage: `url(${albumImage})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    };

    componentDidMount(){
        this.createAudio();
        this.createVisualizer();
    }

    createAudio () {
        this.audio = new Audio(this.props.audio.audio_url)
        this.audio.crossOrigin = "anonymous";
        this.audio.addEventListener('ended', this.pause.bind(this));
    }

    createVisualizer () {
        const canvas = this.canvasRef;
        const ctx = canvas.getContext("2d");
        // let width = canvas.width = window.innerWidth;
        // let height = canvas.height = window.innerHeight;
        let width = canvas.width = window.innerWidth * 0.4;
        let height = canvas.height = window.innerWidth * 0.15;
        
        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let analyser = audioCtx.createAnalyser();
        let audioSrc = audioCtx.createMediaElementSource(this.audio);

        audioSrc.connect(analyser);
        audioSrc.connect(audioCtx.destination);

        analyser.fftSize = 256;
        analyser.minDecibels = -90;
        analyser.maxDecibels = 0;

        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        let gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#D4AF37");
        gradient.addColorStop(1, "#6464ff");

        let barWidth = (width / bufferLength) * 2.5;
        let barHeight;

        let x = 0;

        const draw = () => {
            requestAnimationFrame(draw);

            x = 0;

            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, width, height);

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i]/2;
                
                let r = 177 + (barHeight / 2);
                let g = 141 + (barHeight - 10 / 2);
                let b = 52;
              
                ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                ctx.fillRect(x, (height - barHeight)/2, barWidth, barHeight - 5);
                x += barWidth + 1;
            }
        }
        draw();
    }

    play () {
        this.audio.play();
        this.setState({
            playing: true
        })
    }

    pause () {
        this.audio.pause();
        this.setState({
            playing: false
        });
    }

    rewind () {
        this.audio.currentTime = this.audio.currentTime - 10;
    }

    mute () {
        this.audio.muted = true;
        this.setState({
            muted: true
        });
    }

    unmute () {
        this.audio.muted = false;
        this.setState({
            muted: false
        });
    }

    // need id in future
    toggleLike = async () => {
        const audio_id = this.props.audio.id
        const { id } = this.props.user.id.data.data[0]
        if (this.state.liked === '1') {
            this.props.unlikeAudio(audio_id, id);
            await this.setState({
                liked: '0'
            })
        } else {
            this.props.likeAudio(audio_id, id);
            await this.setState({
                liked: '1'
            })
        }
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }
     
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
     
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    toggleDelete = () => {
        this.props.deletePost(this.props.audio.audio_name);
        this.closeModal();
        this.getNewsfeed();
    }

    renderLike() {
        const auth = this.props.user.auth;
        var currentLocation = window.location.href;
        var result = /[^/]*$/.exec(currentLocation)[0]
        if(auth) {
            return (
            <div className='likes_container' onClick={() => this.toggleLike()}>
                <i className={result === '' ? (this.state.liked && this.state.liked !== '0') ? "fas fa-heart fa-lg clickable-heart" : "far fa-heart fa-lg clickable-heart" : 'd-none'}></i>
                <i className={result === '' ? 'd-none' : 'fas fa-heartbeat fa-lg'}></i>
                <div className={result === '' ? 'd-none' : 'likes-counter'}>{this.props.audio.likes}</div>
            </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }

    render () { 
        var currentLocation = window.location.href;
        var result = /[^/]*$/.exec(currentLocation)[0]
        return (
            <div className="container-fluid">
                <div className="row audio_container">
                    <div className="left_container col-4 d-flex justify-content-center text-center">
                        <div className="avatar_container d-flex align-items-center justify-content-center" style={this.avatarImage}>
                            {
                                this.state.playing
                                    ? <i className={"far fa-pause-circle fa-3x"} onClick={this.pause.bind(this)}></i>
                                    : <i className={"far fa-play-circle fa-3x"} onClick={this.play.bind(this)}></i>
                            }
                            {this.renderLike()}
                        </div>
                    </div>
                    <div className="audio_display col-8 text-center">
                        <div className="align-middle post-title">
                            <Link className='text-white' to={`/audio_info/${this.props.audio.id}`}>{this.props.audio.username} - {this.props.audio.audio_name}</Link>
                            <i className={result === '' ? 'd-none' : 'fa fa-trash fa-2x pull-right'} onClick={(event) => {this.openModal()}} aria-hidden="true"></i>
                        </div>
                        <div className="audio_visualizer">
                            <canvas ref={e => this.canvasRef = e}/>
                        </div>
                        <div className = 'shareContainer d-flex justify-content-around'>
                 
                            <div className="shareIcon">
                            <LinkedinShareButton
                                url={`https://standapp.live/audio_info/${this.props.audio.id}`}
                                title={'Trying something new, dont go too hard on me: '}
                                windowWidth={750}
                                windowHeight={600}
                                className="shareIcon__share-button">
                                <LinkedinIcon
                                size={32}
                                round />
                            </LinkedinShareButton>

                            <LinkedinShareCount
                                url={`https://standapp.live/audio_info/${this.props.audio.id}`}
                                className="shareIcon__share-count">
                                {count => count}
                            </LinkedinShareCount>
                            </div>
                            <div className="shareIcon">
                            <GooglePlusShareButton
                                url={`https://standapp.live/audio_info/${this.props.audio.id}`}
                                className="shareIcon__share-button">
                                <GooglePlusIcon
                                size={32}
                                round />
                            </GooglePlusShareButton>

                            <GooglePlusShareCount
                                url={`https://standapp.live/audio_info/${this.props.audio.id}`}
                                className="shareIcon__share-count">
                                {count => count}
                            </GooglePlusShareCount>
                            </div>
                            <div className="shareIcon">
                            <RedditShareButton
                                url={`https://standapp.live/audio_info/${this.props.audio.id}`}
                                title={'Trying something new, dont go too hard on me: '}
                                windowWidth={660}
                                windowHeight={460}
                                className="shareIcon__share-button">
                                <RedditIcon
                                size={32}
                                round />
                            </RedditShareButton>

                            <RedditShareCount url={`https://standapp.live/audio_info/${this.props.audio.id}`}
                                className="shareIcon__share-count" />
                            </div>

                             {/* <div className="shareIcon">
                            <TwitterShareButton
                                url={`http://standapp.live/audio_info/${this.props.audio.id}`}
                                title={'Trying something new, dont go too hard on me: '}
                                className="shareIcon__share-button">
                                <TwitterIcon
                                size={32}
                                round />
                            </TwitterShareButton>

                            <div className="shareIcon__share-count">
                                &nbsp;
                            </div>
                            </div> */}

                            {/* <div className="shareIcon">
                            <EmailShareButton
                                url={`http://standapp.live/audio_info/${this.props.audio.id}`}
                                subject={'Trying something new, dont go too hard on me: '}
                                body="body"
                                className="shareIcon__share-button">
                                <EmailIcon
                                size={32}
                                round />
                            </EmailShareButton>
                            </div> */}

                            {/* <div className="shareIcon">
                            <FacebookShareButton
                                url={`http://standapp.live/audio_info/${this.props.audio.id}`}
                                quote={'this is a title'}
                                className="shareIcon__share-button">
                                <FacebookIcon
                                size={32}
                                round />
                            </FacebookShareButton>

                            <FacebookShareCount
                                url={`http://standapp.live/audio_info/${this.props.audio.id}`}
                                className="shareIcon__share-count">
                                {count => count}
                            </FacebookShareCount>
                            </div> */}
                        
                            </div>
                    </div>
                </div>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
 
          <h2 className="delete-title" ref={subtitle => this.subtitle = subtitle}>Are you sure you want to delete?</h2>
          <div className='container center-align'>
         
            <div className='delete-controls d-flex justify-content-center fa-2x'>
              <button className='btn btn-dark' onClick={this.closeModal.bind(this)}><i className="fas fa-times fa-3x"/></button>
              <Link to='/' className='btn btn-warning' onClick={this.toggleDelete.bind(this)}><i className="delete-check fas fa-check fa-2x"/></Link>
            </div>
          </div>
        </Modal>
        <div className='d-flex justify-content-center'>
            <hr className='post-hr'/>
        </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {
    likeAudio,
    unlikeAudio, 
    getUserID,
    deletePost,
    getNewsfeed,
})(VisualizerPlayer);