import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom'
import 'antd/dist/antd.css';
import './PageLayout.css';
import Wishlist from '../Wishlist';
import Parties from '../Parties';
import Profile from '../Profile/Profile';
import CreateParty from '../Parties/CreateParty';
import axios from 'axios';

const URL = 'http://localhost:3001/api/profile/'
const { Header, Sider, Content } = Layout;

class PageLayout extends Component {
  state = {
    collapsed: false,
    showPartyPage: true,
    parties: null,
    headerName: "My Parties",
    showPopup: false,
    user: null
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  showProfile = () => {
    this.setState({
      showProfilePage: true,
      showWishlistPage: false,
      showPartyPage: false,
      headerName: "My Profile"
    })
  }

  showWishlist = () => {
    this.setState({
      showWishlistPage: true,
      showProfilePage: false,
      showPartyPage: false,
      headerName: "My Wishlist"
    })
  }

  showParties = () => {
    this.setState({
      showPartyPage: true,
      showWishlistPage: false,
      showProfilePage: false,
      headerName: "My Parties"
    })
  }

  getParties = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => res.data)
      .then(res => this.setState({ parties: res }))
  }

  fbLogoutUser = () => {
    window.FB.getLoginStatus(function (response) {
      if (response && response.status === 'connected') {
        window.FB.logout(function (response) { });
      }
    });
    this.props.history.push('/')
    localStorage.removeItem('token');
  }

  componentDidMount() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: 2274361302637500,
        xfbml: true,
        version: 'v3.2'
      });
    }

    const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
    axios.get(URL, { headers: { Authorization: AuthStr } })
      .then(response => {
        const user = {
          email: response.data.email,
          name: response.data.name,
          url: response.data.picture.data.url,
          wishlist: response.data.wishlist
        }
        this.setState({ user })
      })
    this.getParties();
  }

  render() {
    let pageContent
    if (this.state.showPartyPage) {
      pageContent = <Parties
        partyList={this.state.parties}
        addParty={this.togglePopup}
      />
    }
    if (this.state.showWishlistPage) {
      if (this.state.user === null) {
        pageContent = <Wishlist />
      } else {
        pageContent = <Wishlist wishlist={this.state.user.wishlist} />
      }
    }
    if (this.state.showProfilePage) {
      if (this.state.user === null) {
        console.log('gregesa')
      } else {
        pageContent = <Profile user={this.state.user} />
      }
    }
    return (
      <>
        <Layout style={{ height: "100%" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={this.showParties}>
                <Icon type="star" />
                <span>My Parties</span>
              </Menu.Item>
              <Menu.Item key="2" onClick={this.showWishlist}>
                <Icon type="gift" />
                <span>My Wishlist</span>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.showProfile}>
                <Icon type="user" />
                <span>My Profile</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <span>{this.state.headerName}</span>
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
              {pageContent}
              {this.state.showPopup
                ? <CreateParty
                  closePopup={this.togglePopup}
                />
                : null
              }
            </Content>
          </Layout>
        </Layout>
        <Button className='logout' onClick={this.fbLogoutUser}>Logout</Button>
      </>
    );
  }
}

export default withRouter(PageLayout);