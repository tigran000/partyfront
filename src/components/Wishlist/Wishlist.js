import React, { Component } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import axios from 'axios';

const URL = 'http://localhost:3001/api/wishlist/'
class Wishlist extends Component {
  state = {
    showWishInput: false,
    value: '',
    wishlist: this.props.wishlist,
  }

  wishInputHandler = () => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
    axios.post(URL, { value: this.state.value },
      { headers: { Authorization: AuthStr } })
      .then(response => {
        this.setState({ wishlist: response.data, value: '' })
      })
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  deleteWish = (id) => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
    axios.delete(URL + id, { headers: { Authorization: AuthStr } })
      .then(response => {
        this.setState({ wishlist: response.data })
      })
  }

  render() {
    return (
      <>
        <Input
          onChange={this.handleChange} value={this.state.value} />
        <Button
          icon="plus"
          type="primary"
          onClick={this.wishInputHandler}

        >
          Add Wish
            </Button>
        {this.state.wishlist
          ? this.state.wishlist.map(wish => {
            return (
              <div key={wish._id}>
                <h1> {wish.value}</h1>
                <Button type="danger" icon="delete"
                  onClick={() => this.deleteWish(wish._id)} />
              </div>
            )
          })
          : null
        }
      </>
    )
  }
}

export default Wishlist;