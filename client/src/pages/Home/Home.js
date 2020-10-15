import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import GridCard from '../../components/GridCard';
import logoutAPI from '../../utils/API';

export class Home extends Component {
  state = {
    data: [],
    // cardProp: [
    //   {
    //     header: "Allen",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptate natus et dolorem molestias praesentium dicta explicabo illum voluptatibus, totam iste laudantium numquam accusantium quaerat debitis voluptatem quis magni odio.",
    //     footer: "This is the information footer",
    //     id: 0,
    //   },
    //   {
    //     header: "Brian",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa cumque itaque pariatur corrupti perspiciatis enim, impedit ducimus autem expedita debitis, amet nemo doloribus sequi eaque aliquid? Necessitatibus explicabo voluptates hic!",
    //     footer: "This is the information footer",
    //     id: 1,
    //   },
    //   {
    //     header: "Pat",
    //     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam rem at quia cum alias distinctio officiis debitis, veritatis reiciendis nulla tempore molestiae? Architecto dolorum, tempore provident ut possimus at dolores.",
    //     footer: "This is the information footer",
    //     id: 2,
    //   },
    // ],
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
                    <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                      Loading...
                    </Typography>
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