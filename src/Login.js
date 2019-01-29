import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Redirect, withRouter } from 'react-router'
import axios from 'axios'

const URL = 'http://localhost:3001/api/login/'
class Login extends Component {

  responseFacebook = async response => {
    if (response.id) {
      const user = {
        name: response.name,
        email: response.email,
        picture: response.picture,
        _id: response.userID,
        userToken :response.accessToken
      }
      const { data: { token } } = await axios.post(URL, { user })
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