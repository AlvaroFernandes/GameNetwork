import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
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

class UserInfo extends Component {
    state = {
        _id: this.props._id,
    };

    componentDidMount() {
        const userId = this.props.match.params.id;
        console.log(this.props);
        this.loadBio(userId);
    };
    
    loadBio(id) {
        console.log("called loadBio()")
        api.getUserInfo(id)
        .then(res => {
            console.log("Get user bio: ");
            console.log(res.data);
            if (res.status === 200) {
                this.setState({
                    data: res.data,
                })
            };
        });
    };
    render() {
        const { classes } = this.props;
        console.log(this.state.data);
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
                )}
            </div>
        )
    };
};

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
}
export default withStyles(useStyles)(UserInfo);