import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, List, ListItem, Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
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

class GameSearch extends Component {
    constructor (props){
        super(props);
        this.gameRef = React.createRef();
    }
    state = {
        searchGame: '',
    }

    componentDidMount() {
        this.loadGames();
    }

    loadGames() {
        api.getGames()
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
            searchGame: e.target.value
        })
    };

    handleGameClick = (event, id) => {
        
    };

    render(){
        const { classes } = this.props;
        console.log(this.state);
        return(
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
                        onChange={this.handleSearchInputChange}
                        value={this.state.searchGame}
                        style={{ margin: 8 }}
                        placeholder='Search Games...'
                        fullWidth
                        margin='normal'
                        inputlabelprops={{
                            shrink: true,
                        }}
                    />
                </form>
                {!this.state.searchGame ? (
                    <div></div>
                ):(
                    <List dense className={classes.list}>
                        {
                            this.state.data.filter(
                                e => e.name.toLowerCase().indexOf(this.state.searchGame.toLowerCase()) !==1
                            ).map(
                                e => {
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
                                }
                            )
                        }                        
                    </List>
                )}
            </Grid>
        )
    }
}

GameSearch.propTypes ={
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(GameSearch);