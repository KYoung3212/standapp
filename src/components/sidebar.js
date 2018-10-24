import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/sidebar.css';

class Sidebar extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
           <div id="wrapper">
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li>
                            <Link to='/posts'>Post</Link>
                        </li>
                        <li>
                            <Link to='/avatar_select'>Change Avatar</Link>
                        </li>
                        <li>
                            <Link to='/login'>Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sidebar;