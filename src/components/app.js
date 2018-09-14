import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import '../assets/css/app.css';
import auth from '../hoc/auth';

import Home from './home';
import AudioInfo from './audio_info';
import Recording from './recording';
import NotFound from './404';
import Avatar from './avatar_select'
import Post from './posts';
import login from './login'
import About from './about'

class App extends Component {
    render () {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route 
                        // pass id through path
                        path='/audio_info' 
                        render={ (props) => {
                            // replace with audio_desp component
                            return <AudioInfo/>
                        }}
                />
                {/* <Route path='/recording' component={auth(Recording)}/>
                <Route path='/avatar_select' component={auth(Avatar)}/> */}
                <Route path='/recording' component={Recording}/>
                <Route path='/avatar_select' component={Avatar}/>
                {/* public identify here */}
                {/* <Route path='/posts' component={auth(Post)}/> */}
                <Route path='/posts' component={Post}/>
                <Route path='/login' component={login}/>
                <Route path='/about' component={About}/>
                <Route component={NotFound}/>   
            </Switch>
        )
    }
}

export default App;