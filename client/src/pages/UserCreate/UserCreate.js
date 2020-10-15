import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import submitDataAPI from '../../utils/API';

export class UserCreate extends Component {
    state = {
        data: [],
        username: "",
        password: "",
        fullname: "",
        email: "",
        phone: "",
        age: "",
        country: "",
        psn: "",
        live: "",
        steam: "",
        page: {
            name: "User Create"
        }
    };

    updateInput = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    clearUserData = () => {
        this.setState({ username: "", password: "", fullname: "", email: "", phone: "", age: "", country: "", psn: "", live: "", steam: "",})
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.password && this.state.firstname && this.state.lastname) {
            submitDataAPI.postUserData({
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
            })
            .then(res => this.clearUserData())
            .catch(err => console.log(err));
        };
    };

    render() {
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
                                id="fullname"
                                label="Enter Your full Name"
                                value={this.state.fullname}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="username"
                                label="Enter Username"
                                value={this.state.username}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="password"
                                label="Enter Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="email"
                                label="Enter E-mail"
                                value={this.state.email}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="phone"
                                label="Enter Phone"
                                value={this.state.phone}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="age"
                                label="Enter Age"
                                value={this.state.age}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="psn"
                                label="Enter psn username"
                                value={this.state.psn}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="live"
                                label="Enter your Xbox Live username"
                                value={this.state.live}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <TextField 
                                id="psn"
                                label="Enter your STEAM username"
                                value={this.state.steam}
                                onChange={this.updateInput.bind(this)}
                                style={{margin: "0.5em"}}
                            />
                            <Tooltip
                                title="------ Submit the user login information in the form of ------ 
                                {username: this.state.username, password: this.state.password, 
                                fullname: this.state.fullname, email: this.state.email,
                                phone: this.state.phone, age} -------
                                All the user information is entered into the database accordingly except for the password which is encrypted using bcrypt "
                            >
                                <Button
                                    style={{margin: "1em"}}
                                    disabled={!(this.state.username && this.state.password)}
                                    onClick={this.handleFormSubmit}
                                >
                                    Submit
                                </Button>
                            </Tooltip>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    };
};

export default UserCreate;