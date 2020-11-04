import React, { Component } from 'react';
import api from '../../utils/API';
import BackgroundSlider from 'react-background-slider'
import { Typography, Grid, Paper } from '@material-ui/core'


export default class NoUser extends Component{
    state = {};

    componentDidMount() {
        this.loadImg();
    }


    loadImg() {
        api.getHomeImg()
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

    

    render(){
        return (
            !this.state.data ? (
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >
                    <Paper>
                        <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                            Loading...
                        </Typography>
                    </Paper>
                </Grid>
            ) : (
                <BackgroundSlider
                    images={ this.state.data.map(d => d.img) }
                    duration={10}
                    transition={2}
                />
            )
        )
    }
}