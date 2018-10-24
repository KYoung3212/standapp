import React, { Component } from 'react';
import CommentPlayer from './comment_player';
import { connect } from 'react-redux';
import { getSingleAudio } from '../actions';

class AudioInfo extends Component {
    componentDidMount () {
        let id = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);
        this.props.getSingleAudio(id)
    }

    render () {
        return (
            <div>
                <CommentPlayer/>
            </div>
        )
    }
}

export default connect(null, { getSingleAudio } )(AudioInfo);