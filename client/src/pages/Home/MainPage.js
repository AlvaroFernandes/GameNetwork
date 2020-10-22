import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

export default class MainPage extends Component{
    state = [];

    render(){
        return(
            <div>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    spacing={0}
                >
                    <Paper>
                        <Typography variant='h5' component='h2' style={{ margin: '1em'}}>
                            {this.props.username}
                        </Typography>
                    </Paper>
                </Grid>
            </div>
        )
    }
    
}