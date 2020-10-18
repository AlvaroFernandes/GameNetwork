import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavBar(props) {
  const { classes, loggedIn, } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" href="/">
              <Tooltip 
                title='Routes to "/"'
              >
                <HomeIcon />
              </Tooltip>
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
           GameNetwork
          </Typography>
          {loggedIn ? (
            <div>
              <Tooltip 
                title='Sends a post request to the backend to logout the current user'
              >
                <Button href="" onClick={props.logout} color="inherit">Logout</Button>
              </Tooltip>
              <Tooltip 
                title='Routes to "/Profile"'
              >
                <Button href="/Profile" color="inherit">Profile</Button>
              </Tooltip>
            </div>
          ) : (
            <div>
               <Tooltip 
                title='Routes to "/Login"'
              >
              <Button href="/Login" color="inherit">Login</Button> 
              </Tooltip>
              <Tooltip 
                title='Routes to "/UserCreate"'
              >
                <Button href="/UserCreate" color="inherit">Sign Up</Button>
              </Tooltip>
            </div>
           )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
