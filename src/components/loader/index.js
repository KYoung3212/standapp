import React from 'react';
import loader from './bars.svg';
import './index.css';

const Loader = props => 
    <div className='loader'>
        <img src={loader}/>
    </div>

export default Loader;