import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, List, ListItem, Paper, ListItemText } from '@material-ui/core';
import api from '../../utils/API';
import { Link } from 'react-router-dom'
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
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
})

class UserSearch extends Component {
    constructor(props){
        super(props);
        this.userRef = React.createRef();
    }
    state = {
        searchUser: '',
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers(){
        api.searchUser()
        .then(res => {
            if(res.status === 200){
                this.setState({
                    data: res.data,
                })
            };
        }).catch(error =>{
            console.log(error);
        })
    };

    handleSearchInputChange = e => {
        this.setState({
            searchUser: e.target.value
        })
    };

    render(){
        const { classes } = this.props;
        return(
            <Grid item xs={6}>
                {!this.state.data ? (
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
                        <Paper>
                            <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                                Loading...
                            </Typography>
                        </Paper> 
                    </Grid> 
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" component='h4' style={{ margin: '1em' }}>
                            Search Users
                        </Typography>
                        <form className={classes.root} noValidate id='userSearch'>
                            <TextField
                                id='userSearchInput'
                                label='Search user'
                                ref={ this.userRef }
                                onChange={this.handleSearchInputChange}
                                value={this.state.searchUser}
                                style={{ margin: 8 }}
                                placeholder='Search User...'
                                fullWidth
                                margin='normal'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                        {!this.state.searchUser ? (
                            <div></div>
                        ):(
                            <List dense className={classes.list}>
                                {this.state.data.filter(
                                    e => e.username.toLowerCase().indexOf(this.state.searchUser.toLowerCase()) === 0
                                ).map(
                                    e => {
                                        return(
                                            <ListItem key={e._id} button component={Link} to={`/userInfo/${e._id}`}>
                                                <ListItemText id={e._id} primary={e.username}>
                                                    {e.username}
                                                </ListItemText>
                                            </ListItem>
                                        )
                                    }
                                )}
                            </List>
                        )}
                    </Grid>
                )}
            </Grid>
        )
    }
}

UserSearch.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(UserSearch);