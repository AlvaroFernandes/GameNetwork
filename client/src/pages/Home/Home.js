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
    console.log('logging out');
    logoutAPI.postLogout()
      .then(res => {
        console.log(res.data);
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