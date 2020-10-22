import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, TextField, Button, inputLabelProps} from '@material-ui/core';
import api from '../../utils/API';
import SearchIcon from '@material-ui/icons/Search';
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
    button: {
        margin: theme.spacing(1),
    },
})

class Search extends Component {
    constructor (props) {
        super(props);
        this.userRef = React.createRef();
        this.gameRef = React.createRef();
    }
    state = { 
        searchGame: '',
        searchUser: '',
    }

    handleGameSearchInputChange = () => {
        this.setState({
            searchGame: this.gameRef.current.value
        })
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

    handleGameSearch(){

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
                        <Grid
                            item
                            xs={6}
                        >
                            
                            <Typography variant='h6' component='h4' style={{ margin: '1em' }}>
                                Search Games
                            </Typography>
                            <form className={classes.root} noValidate id='gameSearch'>
                                <TextField 
                                    id='gameSearchInput'
                                    label='Search Games'
                                    ref={ this.gameRef }
                                    onChange={this.handleGameSearchInputChange}
                                    value={this.state.searchGame}
                                    style={{ margin: 8 }}
                                    placeholder='Search Games...'
                                    fullWidth
                                    margin='normal'
                                    inputlabelprops={{
                                        shrink: true,
                                    }}
                                />
                                <Button
                                    onClick={this.handleGameSearch}
                                    label='Search Games'
                                    variant='contained'
                                    className={classes.button}
                                    endIcon={<SearchIcon />}
                                >
                                    Search...
                                </Button>
                            </form>
                        </Grid>
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
