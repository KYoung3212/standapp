import React, {Component} from 'react';
import { Google } from 'react-oauth2';
import { connect } from 'react-redux';
import { logIn, addNewUser } from '../actions';

class GoogleComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      "data": {
      "id": "", "name": "", "email": "", "gender": "", "location": { "id": "", "name": "" }
    },
    loggedin: false
    }
  }

  google = (err, res) =>{
    if (!err) {
      this.setState({ data: res.profile })
    } else {
      this.setState({ data: 'something happen wrong' })
      this.props.history.push("/login");
    }
  }

  async componentDidUpdate(prevProps, prevState){
    const { data: { name, email, email_verified, sub }} = this.state;
    let currentToken = localStorage.getItem('token');
    this.props.logIn(currentToken);
    if (this.state === prevState) {
      return;
    } 
    else if (currentToken !== sub) {
        this.props.history.push("/");
        this.setState({loggedin: true})
        localStorage.setItem('token', sub);
    } else {
        this.props.history.push("/");
    }
    await this.props.addNewUser(name, sub, email)
  }
  
  render () {
    return <div className = "text-center pull-md-right pull-xl-right pull-lg-right pull-sm-right pull-xs-right">
      <Google
        url={'https://standapp.live'}
        // url={'http://localhost:3000'}
        clientId={'702527746371-a7atbnkbimvb8m3drb5g4mpnl6l2r5oi.apps.googleusercontent.com'}
        clientSecret={'ScYeYpfs4-x1gRT7uXt6jHh5'}
        redirectUri={'https://standapp.live'}
        // redirectUri={'http://localhost:3000'}
        scope={['https://www.googleapis.com/auth/userinfo.email']}
        width={300}
        height={300}
        callback={this.google}
        style={{    display: 'inline-block',
        background: '#d14836',
        color: '#fff',
        width: 190,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 2,
        border: '1px solid transparent',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      }}
      >
        Login With Google
  </Google>
    </div>
  }
};

export default connect(null, {logIn, addNewUser})(GoogleComponent);
