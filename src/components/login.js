import React, {Component} from 'react';
import '../assets/css/login.css';
import GoogleComponent from './googleOATH';
import {Route, Link} from 'react-router-dom';
import Bubbles from './bubble';
import Logo from './logo';
import { css } from 'react-emotion';
import { ScaleLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false
        }
      }
    signIn = (values) => {
        this.props.logIn(values)
    }
    startLoading = () => {
        this.setState({
            loading: true
        })
    }

    render () {

        const { handleSubmit, authError } = this.props;
          
        return(
            <div className="login_div text-center sweet-loading">
        
            <Bubbles/>
                <Logo/>
              <hr id="hr1" />
              <i className="fas fa-microphone-alt microphone-login"/>
              <ScaleLoader
                className={'loading'}
                sizeUnit={"px"}
                size={150}
                color={'#F1CD70'}
                loading={this.state.loading} 
                />
       
            
              <div className='login-button' onClick={this.startLoading}>
                <Link to='/' className='btn guest-button'>Guest Login</Link>
                <Route path = '/login' component = {GoogleComponent} />
              </div>
           
            </div>
        )
    }
}

export default Login;