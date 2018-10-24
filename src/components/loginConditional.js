import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../assets/css/login.css';
import { GoogleLogout } from 'react-google-login';

class LoginConditional extends Component {
    redirectToTarget = () => {
        this.props.history.push(`/login`)
      }
    render () {
          
        return(
            <div className="right">
         
              {
                true ?

                <Link to = "/login">
                <GoogleLogout
                    buttonText="Logout"
                    onClick={this.redirectToTarget}



                >
                </GoogleLogout>
                </Link>

                :

                <Link to = "/login">
                <GoogleLogout
                    buttonText="Login"
                    onClick={this.redirectToTarget}
                >
                </GoogleLogout>
                </Link>

                }
            </div>
  
        )
    }
}

export default LoginConditional;