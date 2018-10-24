import React from 'react'
import { GoogleLogout } from './googleLogout';
import { GoogleLogin } from './googleLogin';

const clientId = '617246850621-95f9qhmehd380g2df86pjhrqc84n8nij.apps.googleusercontent.com'

const success = response => {
  console.log(response)
}

const error = response => {
  console.error(response)
}

const loading = () => {
  console.log('loading')
}

const logout = () => {
  console.log('logout')
}

export default () => (
  <div>
    <GoogleLogin
      clientId={clientId}
      scope="https://www.googleapis.com/auth/analytics"
      onSuccess={success}
      onFailure={error}
      onRequest={loading}
      offline={false}
      approvalPrompt="force"
      responseType="id_token"
      isSignedIn
    >
      <span>Analytics</span>
    </GoogleLogin>
    <GoogleLogin
      clientId={clientId}
      scope="https://www.googleapis.com/auth/adwords"
      onSuccess={success}
      onFailure={error}
      onRequest={loading}
      approvalPrompt="force"
      responseType="code"
    >
      <span>Adwords</span>
    </GoogleLogin>
    <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
  </div>
)