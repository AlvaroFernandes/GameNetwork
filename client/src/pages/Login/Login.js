import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import checkLoginAPI from '../../utils/API';

export class Login extends Component {
    state = {
        data: [],
        username: "",
        password: "",
        page: {
            name: "Login"
        },
        redirectTo: null,
    };

    updateInput = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    handleFormSubmit  = event => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            checkLoginAPI.postUserLogin({
                username: this.state.username,
                password: this.state.password,
            })
            .then(res => {
                if (res.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: res.data.username
                    });
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    });
                };
            })
            .catch(error => {
                console.log(error);
                
            });
        };
    };

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '75vh' }}
                >
                    <Paper>
                        <Grid
                            container
                            alignItems="center"
                            direction="column"
                        > 
                            <Typography variant="h5" component="h2" style={{margin: "1em"}}>
                                    Log into your user account
                            </Typography>
                            <TextField 
                                id="username"
                                label="Enter Username"
                                value={this.state.username}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="password"
                                type="password"
                                label="Enter Password"
                                value={this.state.password}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <Button style={{margin: "1em"}} disabled={!(this.state.username && this.state.password)} onClick={this.handleFormSubmit} >
                                Submit
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
            );
        };
    };
};

export default Login;