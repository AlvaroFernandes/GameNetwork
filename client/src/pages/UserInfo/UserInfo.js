import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Grid, Paper, Typography, Button, Avatar, Divider } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import api from '../../utils/API';
import playstation from '../../assets/img/playstation-logo.jpg';
import xbox from '../../assets/img/xbox-logo.png';
import steam from '../../assets/img/steam-logo.png';


const useStyles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
    },
    img: {
        maxWidth: 'inherit',
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
})

class UserInfo extends Component {
    state = {
        _id: this.props._id,
    };

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.loadBio(userId);
    };
    
    loadBio(id) {
        api.getUserInfo(id)
        .then(res => {
            if (res.status === 200) {
                this.setState({
                    data: res.data,
                })
            };
        });
    };

    addUser(id){
        const userId = this.state._id;
        const freiendId = id

        api.postUserFriend({
            userId: userId,
            friendId: freiendId
        })
        .then(res => console.log('friend added!'))
        .catch(err => console.log(err));
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                {!this.state.data ? (
                    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{ minHeight: '100vh' }}>
                        <Paper>
                            <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                                Loading...
                            </Typography>
                        </Paper> 
                    </Grid> 
                ) : (
                    <div className={classes.root}>
                        <Divider className={classes.divider} />
                        <Grid container direction='row'>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={4}>
                                <img src="https://via.placeholder.com/300" alt="profile pic"/>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant='h4'>
                                    {this.state.data.fullname}
                                </Typography>
                                {!this.state.data.age ? (null) : (
                                    <Typography variant='h6' component='p' display='block'>
                                        Age: {this.state.data.age}
                                    </Typography>
                                )}
                                <Typography component='p' display='block'>
                                    E-mail: {this.state.data.email}
                                </Typography>
                                <Typography component='p' display='block'>
                                    Mobile: {this.state.data.phone}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction='row'>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <Typography varient='subtitle' display='block'>
                                    Platforms:
                                </Typography>
                                {!this.state.data.psn ? (
                                    null
                                ): (
                                <Chip label={this.state.data.psn} variant='outlined' color='primary' avatar={<Avatar src={ playstation } />} />                            
                                )}
                                {!this.state.data.live ? (
                                    null
                                ): (
                                <Chip label={this.state.data.live} variant='outlined' color='primary' avatar={<Avatar src={ xbox } />} />                            
                                )}
                                {!this.state.data.steam ? (
                                    null
                                ): (
                                <Chip label={this.state.data.steam} variant='outlined' color='primary' avatar={<Avatar src={ steam } />} />                            
                                )}
                            </Grid>
                            <Grid item xs={2}></Grid>                
                        </Grid>
                        <Grid container diretion='row'>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={8}>
                                <Button variant='contained' color="primary" style={{ float: 'right' }} onClick={() => this.addUser(this.state.data._id)} startIcon={<AddCircleOutlineIcon />}>
                                    Add Friend
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                )}
            </div>
        )
    };
};

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(useStyles)(UserInfo);