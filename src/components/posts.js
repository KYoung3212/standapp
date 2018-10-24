import React, { Component, Fragment } from 'react';
import '../assets/css/newsfeed.css';
import '../assets/css/posts.css'

import Header from './header';
import Footer from './footer';
import VisualizerPlayer from './visualizer_player';

import { getUserPosts, addAvatar, getUserID } from '../actions';
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

import Loader from './loader';

class Post extends Component {
    constructor(props){
        super(props);
    this.state = {
        newsFeed: '',
        avatarID: null,
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
            {name: 'Default', src: defaultAvatar, id: 0},
            {name: 'Tuba', src: Tuba, id: 11},
        ],
        loading: true
    }
    }

    componentDidMount () {
    }

    componentWillMount = async () => {
        let token = localStorage.getItem('token');
        await this.props.getUserID(token);
        const { id } = this.props.user.id.data.data[0];
        await this.props.getUserPosts(id);
        await this.checkAvatar();
        this.setState({
            loading: false
        })
    }

    checkAvatar = async () => {
        const { avatar } = this.props.user.id.data.data[0]
        let imageArray = this.state.imageArray;
        if (this.props.user.id) {
            for (var i = 0; i < imageArray.length; i++) {
                let imageID = imageArray[i].id;
                if (imageID == avatar) {
                    await this.setState({
                        avatar: imageArray[i].src
                    })
                }
            }
        } 
    }

    renderPosts() {
        if (this.props.list.data) {
            this.renderUserPosts = this.props.list.data.map( function(element){
                return(
                    <VisualizerPlayer key={element.id} audio={element}/>
                )
            })
        }

        if (this.state.loading) {
            return <Loader/>
        } 
        
        return (
            <Fragment>
                <div className='container text-center'>
                    <img alt="Avatar" src={this.state.avatar} className=" post_avatar_container img-fluid avatar_image" />

                    <div className='account-info d-flex align-items-center justify-content-around'>
                    </div>
                </div>
                <div className="newsfeed">                
                    {this.renderUserPosts};
                </div>
            </Fragment>
        )

    }
    
    render () {

        return (
            <div>
                <Header/>
                {this.renderPosts()}
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        avatar: state.user,
        list: state.feed.user,
        user: state.user
    }
}

export default connect(mapStateToProps, {addAvatar, getUserPosts, getUserID})(Post);

