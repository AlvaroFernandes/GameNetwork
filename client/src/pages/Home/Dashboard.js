import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, List, ListItem, Link, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import api from '../../utils/API';
import PropTypes from 'prop-types';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
})

class Dashboard extends Component {
    state = {
        bio: '',
        data: [],
        _id: this.props.id,
    };

    componentDidMount() {
        this.loadInfo();
    }

    loadInfo() {
        api.getBio(this.props.id)
        .then(res => {
            if(res.status === 200){
                this.setState({
                    bio: res.data,
                })
                this.loadGame();
            };
        });
    };

    loadGame(){
        this.state.bio.games.map(e => {
          api.getGame(e)
          .then(res => {
              if(res.status === 200){
                  this.setState({
                      games: res.data
                  })
                  this.loadFriends();
              }
          })
          .catch(error => {
                console.log(error);
            })
        })
        
    }

    loadFriends(){
        this.state.bio.friends.map(e => {
          api.getUserInfo(e)
          .then(res => {
              if(res.status === 200){                  
                  this.setState({
                      friends: res.data
                  })
              }
          })
          .catch(error => {
                console.log(error);
            })
        })
        
    }

    render(){
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <div>
                    <div className={classes.appBarSpacer} />

                        <Grid
                    container
                    direction='row'
                    justify='center'
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Paper className={classes.paper}>
                            <Typography variant='h5' component='h2' style={{ margin: '1em'}}>
                                Hello {this.state.bio.fullname}!!
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper className={classes.paper}>
                            <Typography variant='h6' component='h4' style={{ margin: '1em' }}>
                                List of add games
                            </Typography>
                            {/* {!this.state.games ? (
                                <Paper>
                                    <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                                        Loading...
                                    </Typography>
                                </Paper> 
                            ):(
                                <List className={classes.list}>
                                {this.state.games.map( e => {
                                    return(
                                        <ListItem key={e.id} button component={Link} to={`/gameInfo/${e.id}`}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={e.name}
                                                    src={e.backgroundImage}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText id={e.id} primary={e.name} />
                                        </ListItem>
                                    )
                                })}                            
                                </List>
                            )} */}
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper className={classes.paper}>
                            <Typography variant='h6' component='h4' style={{ margin: '1em' }}>
                                List of Friends
                            </Typography>
                            {/* {!this.state.friends ? (
                                <Paper>
                                    <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                                        Loading...
                                    </Typography>
                                </Paper> 
                            ): (
                            <List className={classes.list}>

                                 {this.state.friends.map( e => {
                                     
                                     console.log("Friends " + e);
                                    return(
                                        <ListItem key={e._id} button component={Link} to={`/userInfo/${e._id}`}>
                                            <ListItemText id={e._id} primary={e.username}>
                                                    {e.username}
                                                </ListItemText>
                                        </ListItem>
                                    )
                                })} 
                            </List>
                            )} */}
                        </Paper>
                    </Grid>
                </Grid>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Dashboard);