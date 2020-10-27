import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import api from '../../utils/API';
import PropTypes from 'prop-types';
import GameSearch from './gameSearch';
import UserSearch from './userSearch';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(1),
    },
})

class Search extends Component {
    constructor (props) {
        super(props);
        this.userRef = React.createRef();
    }
    state = { 
        searchUser: '',
    }

    
    handleUserSearchInputChange = () => {
        this.setState({
            searchUser: this.userRef.current.value
        })
    }

    handleUserSearch = e => {
        e.preventDefault();

        if(this.state.searchUser){
            console.log(this.state.searchUser);
            api.searchUser({
                user: this.state.searchUser,
            })
            .then(
                res =>{
                    console.log(res);
                }
            )
            .catch(err => console.log(err))
        }
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.appBarSpacer} />
                <Paper className={classes.paper}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography variant='h3' component='h2' style={{ margin: '1em'}}>
                                Search
                            </Typography>
                        </Grid>
                        <GameSearch />
                        <UserSearch />
                    </Grid>
                </Paper>
            </div>
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Search);
