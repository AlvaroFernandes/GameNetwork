import React, { Component } from 'react';
import logoutAPI from '../../utils/API';
import NoUser from './NoUser';
import Dashboard from './Dashboard';

export class Home extends Component {
  state = {
    data: [],
    pageName: {
      name: "Home"
    },
    redirectTo: null,
  };
  logout(event) {
    event.preventDefault();
    logoutAPI.postLogout()
      .then(res => {
        if (res.status(200)) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: '/'
          });
        };
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <Dashboard data={this.props}/>
        ) : (
          <NoUser />
        )}
      </div>
    )
  };
};

export default Home;