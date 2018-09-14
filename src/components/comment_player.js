import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../assets/css/comment_player.css';
import CommentBar from './comment_bar';
import axios from 'axios';
import { postComment, getSingleAudio } from '../actions';
import { connect } from 'react-redux';

// need to fix here, not audio_info!

class CommentPlayer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            buffer: null,
            duration: 0,
            tracks: { 
                artist: 'Paul',
                song: "Goodbye",
                url: "https://api.soundcloud.com/tracks/436771803/stream?client_id=b1495e39071bd7081a74093816f77ddb",
                album_image: '',
                comment: [
                    {
                        time: 0.1,
                        message: "first!!"
                    },
                    {
                        time: 1, 
                        message: 'This sounds awesome!'
                    },
                    {
                        time: 3,
                        message: 'we made it!'
                    },
                    {
                        time: 5.52, 
                        message: 'this sucks'
                    },
                    {
                        time: 6.00, 
                        message: 'NOOOOOOOO!!!!!!'
                    },
                    {
                        time: 8,
                        message: 'who is she?'
                    },
                    {
                        time: 20, 
                        message: 'this is awesome!!!'
                    }
                ]
            },
            audio_file: '',
            playing: false,
            like: false,
            muted: false, 
            displayed_comment: '',
            draw: true
        }
    }

    componentDidMount(){
        if (this.props.comment) {
            this.createAudio();
            this.createVisualizer();
        }
    }

    async componentWillMount() {
        var currentLocation = window.location.href;
        var result = /[^/]*$/.exec(currentLocation)[0]
        await this.props.getSingleAudio(result);
        console.log(this.props.comment)
    }

    createAudio () {
        this.audio = new Audio(this.props.comment[0].audio_url);
        this.audio.crossOrigin = "anonymous";
    }

    createVisualizer () {
        this.recussion = true;
        const canvas = document.getElementById("comment-canvas");
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let analyser = audioCtx.createAnalyser();
        let audioSrc = audioCtx.createMediaElementSource(this.audio);

        audioSrc.connect(analyser);
        audioSrc.connect(audioCtx.destination);

        analyser.fftSize = 2048;
        analyser.minDecibels = -90;
        analyser.maxDecibels = 0;

        let bufferLength = analyser.frequencyBinCount;
        let dataArray = new Uint8Array(bufferLength);

        let gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "#D4AF37");
        gradient.addColorStop(1, "#6464ff");

        this.draw = () => {
            if (this.recussion === true) {
                console.log(this.audio.currentTime);
                requestAnimationFrame(this.draw);
                analyser.getByteFrequencyData(dataArray);

                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);

                let segments = dataArray.length / 2;
                let radius = (height + dataArray[0]) / 5;
                let angle = (Math.PI * 2) / segments;

                ctx.lineWidth = 2;
                ctx.strokeStyle = gradient;

                for(let i = 0; i < segments; i++) {
                    let barHeight = dataArray[i] > 0 ? dataArray[i] : 1;

                    let x1 = width / 2 + Math.cos(angle * i) * radius;
                    let x2 = width / 2 + Math.cos(angle * i) * (radius + barHeight);

                    let y1 = height / 2 + Math.sin(angle * i) * radius;
                    let y2 = height / 2 + Math.sin(angle * i) * (radius + barHeight);

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
            // toggle this on play and pause
            this.checkComment();
        }
        this.draw();
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
        cancelAnimationFrame(this.draw);
    }

    async stop () {
        this.audio.pause();
        this.audio.currentTime = 0
        this.recussion = false;
        cancelAnimationFrame(this.draw);
    }

    rewind () {
        this.audio.currentTime = this.audio.currentTime - 5;
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

    checkComment () {
        for (let i = 0; i < this.state.tracks.comment.length; i++) {
            if (this.state.tracks.comment[i].time <= this.audio.currentTime) {
                this.setState({
                    displayed_comment: this.state.tracks.comment[i].message
                })
            }
        }
    }

    async postComment (commentObject) {
        if(!commentObject) {
            throw new Error('Missing Message')
        }
        commentObject.time = this.audio.currentTime;
        this.setState({
            displayed_comment: commentObject.comment
        })
        await this.props.postComment(commentObject);
    }

    toggleLikeButton = () => {
        this.setState({
            like: !this.state.like
        })
    }

    render() {
        console.log('THIS PROPS COMMENT: ', this.props.comment)
        let author_name = null;
        let audio_name = null;
        let audio_file = null;

        if(this.props.comment){
            author_name = this.props.comment[0].author_name
            audio_name = this.props.comment[0].audio_name
            audio_file = this.props.comment[0].audio_url
        }

        return (
            <div className="player container text-center">
                <canvas id='comment-canvas'></canvas>
                <div className="row">
                    <Link to='/'><i className="fas fa-chevron-left fa-2x back-button" onClick={this.stop.bind(this)}/></Link>
                </div>
                <div className="song">
                    <h1 className="name">{audio_name}</h1>
                    <h3 className="artist">{author_name}</h3>
                    <i id='like-container' onClick={this.toggleLikeButton} className={this.state.like ? "fas fa-heart fa-lg fa-2x" : "far fa-heart fa-lg fa-2x"}></i>
                </div>
                {/* <div className="display-area">
                    <div className="comments-container">{author_name}</div>
                    <div className="time"></div>
                </div> */}
                {this.state.audio}
                <div className='controls-container'>
                    <div className="controls d-flex justify-content-around">
                        <i className="fas fa-undo-alt fa-3x rewind" onClick={this.rewind.bind(this)}/>
                        <i className={!this.state.playing ? "fas fa-play fa-3x play" : "d-none"} onClick={this.play.bind(this)}/>
                        <i className={!this.state.playing ? "d-none" : "fas fa-pause fa-3x pause"} onClick={this.pause.bind(this)}/>
                        <i className={!this.state.muted ? "fas fa-volume-up fa-3x unmute" : "d-none"} onClick={this.mute.bind(this)}/>
                        <i className={!this.state.muted ? "d-none" : "fas fa-volume-off fa-3x mute"} onClick={this.unmute.bind(this)}/>
                    </div>
                </div>
                {/* <CommentBar post={this.postComment.bind(this)}/> */}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        comment: state.comment.single.data
    }
}

export default connect(mapStateToProps, {postComment, getSingleAudio})(CommentPlayer);