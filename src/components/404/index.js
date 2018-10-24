import React, { Component } from 'react';
import Header from '../header';
import { Link } from 'react-router-dom';

class NotFound extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className='container-fluid'>
            <Header/>
            <h1 className='about-title'>Page Not Found</h1>
            <div className='text-center'>
                <Link to='/' className='btn btn-outline-warning'>Back Home</Link>
            </div>
            </div>
        )
    }
}

export default NotFound;