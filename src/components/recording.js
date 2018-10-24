import React from 'react';
import Microphone from './microphone';
import '../assets/css/recording.css';

export default () => {
    return (
        <div id='recording_page' className="container">
            <Microphone />
        </div>
    )
}
