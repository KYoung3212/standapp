import React, { Component } from 'react';
import '../assets/css/avatar_select.css';
import SimpleSlider from './carousel';
import Header from './header';

class Avatar extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className='container-fluid'>
                <Header/>
                <p className="avatar-select-title text-center">Select your avatar</p>     
                <SimpleSlider/>
            </div>
        )
    }
}

export default Avatar;