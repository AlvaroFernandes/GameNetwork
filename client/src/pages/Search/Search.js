import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import api from '../../utils/API';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import GameSearch from './gameSearch';

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
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography variant='h6' component='h4' style={{ margin: '1em' }}>
                                Search Friends
                            </Typography>
                            <form className={classes.root} noValidate id='userSearch'>
                                <TextField 
                                    id='userSearchInput'
                                    label='Search User'
                                    ref={ this.userRef }
                                    onChange={this.handleUserSearchInputChange}
                                    value={this.state.searchUser}
                                    style={{ margin: 8 }}
                                    placeholder='Search User...'
                                    fullWidth
                                    margin='normal'
                                    inputlabelprops={{
                                        shrink: true,
                                    }}
                                />
                                <Button
                                    onClick={this.handleUserSearch}
                                    variant='contained'
                                    className={classes.button}
                                    endIcon={<SearchIcon />}
                                >
                                    Search...
                                </Button>
                            </form>
                        </Grid>
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
