// Dependencies 
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import api from './utils/API';
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Pages/Components
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
import Home from './pages/Home';
import Login from './pages/Login';
import UserCreate from './pages/UserCreate';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import NoMatch from './pages/NoMatch';
import Search from './pages/Search';
import Game from './pages/Game';
import UserInfo from './pages/UserInfo';
// !^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const theme = createMuiTheme({
  pallete: {
    primary: { main: "#b71c1c" },
    secondary: { main: "#f50057" }
  },
  typography: {
    useNextVariants: true,
  }, 
  overrides: {
    MuiButton: {
      root: {
        color: 'white',
        backgroundColor: '#3f51b5',
        '&:hover': {
          backgroundColor: 'black'
        }
      }
    }
  },
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
    };

    this.getUser = this.getUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  };
  
  componentDidMount() {
    this.getUser();
  };

  updateUser (userObject) {
    this.setState(userObject)
  };

  getUser() {
    api.getUser()
    .then(res => {
      if (res.data.user) {
        this.setState({
          loggedIn: true,
          username: res.data.user.username,
          _id: res.data.user._id,
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null
        });
      };
    });
   };

   logout(event) {
    event.preventDefault();
    api.postLogout()
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          this.state.updateUser({
            loggedIn: false,
            username: null,
          });
        };
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <NavBar {...this.state} logout={this.logout} />
        <Router>
          <Switch>
            <Route path="/" exact render={
              () => <Home {...this.state} updateUser={this.updateUser} />
            } />
            <Route path="/Login" render={
              () => <Login updateUser={this.updateUser} />
            } />
            <Route path="/UserCreate" component={UserCreate} />
            <Route path="/Profile" render={
              () => <Profile {...this.state} />
            } />
            <Route path="/search" component={Search} />
            <Route path="/gameInfo/:id" render={
              (props) => <Game {...{...this.state, ...props}}  />
            } />
            <Route path="/userInfo/:id" render={
              (props) => <UserInfo {...{...this.state, ...props}}  />
            } />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  };
};

export default App;