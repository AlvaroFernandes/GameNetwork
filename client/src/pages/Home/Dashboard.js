import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import api from '../../utils/API';
import PropTypes from 'prop-types';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    }
})

class Dashboard extends Component {
    state = {
        bio: '',
        data: [],
        _id: this.props.id,
    };

    componentDidMount() {
        this.loadInfo();
    }

    loadInfo() {
        console.log('Get user info');
        api.getBio(this.props.id)
        .then(res => {
            if(res.status === 200){
                this.setState({
                    bio: res.data,
                })
            };
        });
    };

    render(){
        console.log(this.state);
        const {classes} = this.props;
        return(
            <div className={classes.root}>
                <div className={classes.appBarSpacer} />
                <Grid
                    container
                    direction='row'
                    justify='center'
                    spacing={3}
                >
                    <Grid
                        item
                        xs={12}
                    >
                        <Paper className={classes.paper}>
                            <Typography variant='h5' component='h2' style={{ margin: '1em'}}>
                                Hello {this.state.bio.fullname}!!
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper className={classes.paper}>
                            <Typography variant='h6' component='h4' style={{ margin: '1em' }}>
                                List of add games
                            </Typography>
                            
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                    >
                        <Paper className={classes.paper}>
                            <Typography variant='h6' component='h4' style={{ margin: '1em' }}>
                                List of Friends
                            </Typography>

                        </Paper>
                    </Grid>
                </Grid>    
            </div>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Dashboard);