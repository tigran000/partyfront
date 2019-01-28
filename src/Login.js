import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Redirect, withRouter } from 'react-router'
import axios from 'axios'
class Login extends Component {

  responseFacebook = async response => {
    if (response.id) {
      const user = {
        name: response.name,
        email: response.email,
        picture: response.picture,
        _id: response.userID
      }
      const { data: { token } } = await axios.post('/api/login', { user })
      localStorage.setItem('token', token)
      this.props.history.push('/dashboard')
    }
  }

  render() {
    let button;
    let auth = localStorage.getItem('token')
    if (auth) {
      return <Redirect to="/dashboard" />
    } else {
      button = (
        <FacebookLogin
          appId='2274361302637500'
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook} />
      )
    }
    return button;
  }
}

export default withRouter(Login);