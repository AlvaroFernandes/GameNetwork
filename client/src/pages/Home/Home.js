import React, { Component } from 'react';
import logoutAPI from '../../utils/API';
import NoUser from './NoUser';
import MainPage from './MainPage';

export class Home extends Component {
  state = {
    data: [],
    pageName: {
      name: "Home"
    }
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
        };
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    // const { cardProp } = this.state;
    return (
      <div>
        {this.props.loggedIn ? (
          <MainPage data={this.props}/>
        ) : (
          <NoUser />
        )}
      </div>
    )
  };
};

export default Home;