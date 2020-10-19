import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import logoutAPI from '../../utils/API';
import NoUser from './NoUser';

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
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '75vh' }}
        >
          <Grid
            item
            xs={3}
          >
            {/* <Grid 
              container
              spacing={8}
              direction="column"
              alignItems="center"
              justify="center"
              >
                {cardProp.map(index => {
                  return(
                    <Grid
                      item
                      key={index.id} 
                    >
                      <GridCard {...index} />
                    </Grid>
                    )
                })}
              </Grid> */}
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Grid 
              container
              spacing={0}
              direction="row"
              alignItems="center"
              justify="center"
              style={{padding: 10}}
              >
              <Paper>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                > 
                  
                  {this.props.loggedIn ? (
                    <div>
                      <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                        Welcome to your Home Page
                      </Typography>
                      <Typography variant="h5" component="h2" style={{margin: "1em", textAlign: "center"}}>
                        {this.props.username}
                      </Typography>
                    </div>
                  ) : (
                    <NoUser />
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
          >
            {/* <Grid 
              container
              spacing={8}
              direction="column"
              alignItems="center"
              justify="center"
              >
                {cardProp.map(index => {
                  return(
                    <Grid
                      item
                      key={index.id}
                    >
                    <GridCard {...index} />
                    </Grid>
                    )
                })}
              </Grid> */}
          </Grid>
        </Grid>
      </div>
    )
  };
};

export default Home;