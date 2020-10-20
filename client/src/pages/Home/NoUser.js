import React, { Component } from 'react';
import api from '../../utils/API';
import BackgroundSlider from 'react-background-slider'
import { Typography } from '@material-ui/core'


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
       console.log(this.state.data);
        return (
            !this.state.data ? (
                <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                      Loading...
                </Typography>
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