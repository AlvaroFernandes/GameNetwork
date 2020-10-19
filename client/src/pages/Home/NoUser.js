import React, { Component } from 'react';
import api from '../../utils/API';


export default class NoUser extends Component{
    state = {
        data: [],
    };

    componentDidMount() {
        this.loadImg();
    }


    loadImg() {
        api.getHomeImg()
        .then(res => {
            console.log(res);
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
        const valueProps = props => {
            const slides = () => {
                this.state.data.map(e => {
                    <div style={{ backgroundImage: e.img }}>
                        <h1>{e.name}</h1>
                    </div>
                })
            }
        }
        return (
        )
    }
}