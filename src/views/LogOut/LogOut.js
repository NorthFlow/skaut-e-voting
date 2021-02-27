import React, { Component } from 'react'
import {Redirect } from "react-router-dom";

class Logout extends Component {

    state={
        readyToRedirect: false
    };

  componentDidMount() {
    localStorage.removeItem("token");
    this.setState({
        readyToRedirect: true
      });
      this.props.history.replace('/login');
      window.location.reload();
  }

  render() {
    if (this.state.readyToRedirect) return <Redirect to="/login" />

    return (
      <div>odhlas sa kamosko</div>
    )
  }
}

export default Logout;