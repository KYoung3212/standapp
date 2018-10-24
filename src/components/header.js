import React from 'react';
import '../assets/css/header.css';

import defaultAvatar from '../assets/images/avatars/default_avatar.png'
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

import {Link} from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';
import Logo from './logo';
import { connect } from 'react-redux';
import { getUserID } from '../actions';
import { Fragment } from 'react';

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
            ]
        }
    }

    async componentDidMount () {
        let token = localStorage.getItem('token');
        await this.props.getUserID(token);
        this.checkAvatar();
    }

    showSettings (event) {
        event.preventDefault();
    }
    
    logOut () {
        localStorage.removeItem('token');
    }

    checkAvatar = async () => {
        let imageArray = this.state.imageArray;
        if (this.props.user.id) {
            const { avatar } = this.props.user.id.data.data[0]
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

    renderLinks () {
        const { auth } = this.props.user

        if (auth) {
            return (
                <Fragment>
                    <Menu>
                        <Link to='/posts'>
                            <img alt="Avatar" src={this.state.avatar} className="img-fluid avatar_image" />
                        </Link>
                        <Link id="home" className="menu-item" to="/posts"><i className="fas fa-home menu-item fa-fw"/>  My Account</Link>
                        <Link id="about" className="menu-item" to="/avatar_select"><i className="far fa-user-circle menu-item fa-fw"/>   Avatar Select</Link>
                        <Link id="contact" className="menu-item" to="/about"><i className="fas fa-users menu-item fa-fw"/>  About Us</Link>
                        <Link id="contact" className="menu-item" to="/login" onClick={this.logOut.bind()}><i className="fas fa-sign-out-alt menu-item fa-fw"/>   Log Out</Link>
                    </Menu>
                </Fragment>
            )
        }
        
        return (
            <Fragment>
                <Menu>
                    <Link to='/'>
                        <img alt="Avatar" src={this.state.avatar} className="img-fluid avatar_image" />
                    </Link>
                    <Link id="contact" className="menu-item" to="/about"><i className="fas fa-users menu-item fa-fw"/>  About Us</Link>
                    <Link id="contact" className="menu-item" to="/login" onClick={this.logOut.bind()}><i className="fas fa-sign-out-alt menu-item fa-fw"/>   Login / Signup</Link>
                </Menu>
            </Fragment>
        )
    }

    render(){

        var currentLocation = window.location.href;
        var result = /[^/]*$/.exec(currentLocation)[0];
        if (result === '') {
        return (
            <div className="container-fluid">
                <div className="navBar d-flex justify-content-between">
                    {this.renderLinks()}
                    <div className='logo'>
                        <Logo/>
                    </div>
                </div>
                <hr className="white"/>
            </div>
        )
    } else {
        return (
            <div className="container-fluid">
                <div className="navBar d-flex justify-content-between">
                    <div className="back_button">
                        <Link to='/'>
                            <i className="fas fa-chevron-left fa-2x"/>
                        </Link>   
                    </div>
                    <div className='logo'>
                        <Logo/>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }}

}

function mapStateToProps (state) {
    return {
        avatar: state.user.avatar,
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserID})(Header);