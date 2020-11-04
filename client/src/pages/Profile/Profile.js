import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import api from '../../utils/API';
import playstation from '../../assets/img/playstation-logo.jpg';
import xbox from '../../assets/img/xbox-logo.png';
import steam from '../../assets/img/steam-logo.png';
import { Divider } from '@material-ui/core';

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
                        {!this.state.data.age ? (
                                null
                            ) : (
                                <Typography variant='h6' component='p' display='block'>
                                    Age: {this.state.data.age}
                                </Typography>
                            )}
                        <Typography variant='h6' component='p' display='block'>
                            E-mail: {this.state.data.email}
                        </Typography>
                        <Typography variant='h6' component='p' display='block'>
                            Mobile: {this.state.data.phone}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
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