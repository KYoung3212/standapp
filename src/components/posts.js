import React, { Component } from 'react';
import '../assets/css/newsfeed.css';
import '../assets/css/posts.css'

import Header from './header';
import Footer from './footer';
import VisualizerPlayer from './visualizer_player';
import dummyAudioObject from '../assets/data/dummy_audio_object';

import avatar from '../assets/images/avatars/10kevinSoccer.jpg';
import Dm from './dm'

import { getNewsfeed, getPosts, addAvatar } from '../actions';
import { connect } from 'react-redux';

import defaultAvatar from '../assets/images/avatars/default_avatar.png';
import Dj from '../assets/images/avatars/2brettDj.jpg';
import Tuba from '../assets/images/avatars/4codyTuba.jpg';
import Piano from '../assets/images/avatars/6erinPiano.jpg';
import Planet from '../assets/images/avatars/7frankPlanet.jpg';
import Rapper from '../assets/images/avatars/8jennaRapper.jpg';
import Reading from '../assets/images/avatars/9katReading.jpg';
import Soccer from '../assets/images/avatars/10kevinSoccer.jpg';
import Jedi from '../assets/images/avatars/12sarahJedi.jpg';
import Celebrity from '../assets/images/avatars/16nateCelebrity.jpg';
import Sax from '../assets/images/avatars/sax.jpg';



class Post extends Component {
    constructor(props){
        super(props);
    this.state = {
        newsFeed: '',
        avatarID: this.props.avatar,
        avatar: defaultAvatar,
        imageArray: [
            {name: 'Dj', src: Dj, id: 1},
            {name: 'Tuba', src: Tuba, id: 2},
            {name: 'Piano', src: Piano, id: 3},
            {name: 'Planet', src: Planet, id: 4},
            {name: 'Rapper', src: Rapper, id: 5},
            {name: 'Reading', src: Reading, id: 6},
            {name: 'Soccer', src: Soccer, id: 7},
            {name: 'Jedi', src: Jedi, id: 8},
            {name: 'Celebrity', src: Celebrity, id: 9},
            {name: 'Sax', src: Sax, id: 10},
            {name: 'Default', src: defaultAvatar, id: 0}
        ]
    }
    }

    componentDidMount () {
        
    }

    componentWillMount = () => {
        this.checkAvatar();
        this.props.getNewsfeed();
        let token = localStorage.getItem('token');
        console.log('token post: ', token)
        // this.props.getPosts(token);
    }

    checkAvatar = async () => {
        let imageArray = this.state.imageArray;
        if (this.state.avatarID) {
            for (var i = 0; i < imageArray.length; i++) {
                let imageID = imageArray[i].id;
                if (imageID == this.state.avatarID.image) {
                    await this.setState({
                        avatar: imageArray[i].src
                    })
                }
            }
        } 
    }
    render () {
        console.log("THIS PROPS: ", this.props)
        if (this.props.list.data) {
            this.renderUserPosts = this.props.list.data.map( function(element){
                return(
                    <VisualizerPlayer key={element.id} audio={element}/>
                )
            })
        }
        return (
            <div>
                <div>
                    <Dm/>
                </div>
                <Header/>
                <div className='container text-center'>
                    <img alt="Avatar" src={this.state.avatar} className=" post_avatar_container img-fluid avatar_image" />

                    <div className='account-info d-flex align-items-center justify-content-around'>
                        <div> <strong>Posts:</strong> 12</div>
                        <div> <strong>Likes:</strong> 158</div>
                    </div>
                </div>
                {this.renderUserPosts};
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        list: state.feed.all,
        avatar: state.user
    }
}

export default connect(mapStateToProps, {getNewsfeed, addAvatar})(Post);

