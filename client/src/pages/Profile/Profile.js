import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import api from '../../utils/API';

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
    }
})

export class Profile extends Component {
    state = {
        data: [],
        _id: this.props._id,
    };
    componentDidMount() {
        this.loadBio();
    };
    updateInput = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };
    submitUpdate = event => {
        event.preventDefault();
        api.postBio({
            _id: this.state._id,
            age: this.state.age,
        })
        .then(res => {
            console.log('submit response: ');
            console.log(res);
            if (res.status === 200) {
                console.log("post successful")
            }
        })
    }
    loadBio() {
        console.log("called loadBio()")
        console.log(this.state._id)
        api.getBio(this.state._id)
        .then(res => {
            console.log("Get user bio: ");
            console.log(res.data);
            if (res.status === 200) {
                this.setState({
                    data: res.data,
                    age: this.state.age,
                })
            };
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container direction='row'>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <img src="https://via.placeholder.com/300" alt="profile pic"/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant='h4'>
                            {this.state.data.fullname}{!this.state.data.age ? (
                                null
                            ) : (
                                ", ${this.state.data.age}"
                            )}
                        </Typography>
                        <Typography variant='p' display='block'>
                            E-mail: {this.state.data.email}
                        </Typography>
                        <Typography variant='p' display='block'>
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
                           <Chip label={this.state.data.psn} variant='outlined' color='primary' avatar={<Avatar src='../../assets/img/playstation-logo.jpg' />} />                            
                        )}
                        {!this.state.data.live ? (
                            null
                        ): (
                           <Chip label={this.state.data.live} variant='outlined' color='primary' avatar={<Avatar src='../../assets/img/xbox-logo.png' />} />                            
                        )}
                        {!this.state.data.steam ? (
                            null
                        ): (
                           <Chip label={this.state.data.steam} variant='outlined' color='primary' avatar={<Avatar src='../../assets/img/steam-logo.png' />} />                            
                        )}
                    </Grid>
                    <Grid item xs={2}></Grid>                
                </Grid>
                <Grid container diretion='row'>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                    </Grid>
                </Grid>
            </div>
        )
    };
};

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(useStyles)(Profile);