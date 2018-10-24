import React from 'react';
import '../assets/css/logo.css';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <Link to='/' id="logo-text" className="text-center">
            <b>Stand</b><span id="app-text">App</span>
        </Link>
    )
}