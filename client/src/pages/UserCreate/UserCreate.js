import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
    InputLabel, 
    FormControl, 
    Input, 
    FormHelperText, 
    Grid, 
    Paper, 
    Typography, 
    Button, 
    Tooltip,
    InputAdornment,
    IconButton,
    NativeSelect
 } from '@material-ui/core';
 import {
    Visibility,
    VisibilityOff
 } from '@material-ui/icons'
import submitDataAPI from '../../utils/API';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: 75 + '%',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export class UserCreate extends Component {
    state = {
        data: [],
        username: "",
        password: "",
        fullname: "",
        email: "",
        phone: "",
        age: "",
        psn: "",
        live: "",
        steam: "",
        showPassword: false,
        page: {
            name: "User Create"
        },
        redirectTo: null,
    };
    
    
   
    updateInput = event => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    clearUserData = () => {
        this.setState({ username: "", password: "", fullname: "", email: "", phone: "", age: "", country: "", psn: "", live: "", steam: "",redirectTo: "/login"});
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username && this.state.password && this.state.fullname && this.state.email) {
            submitDataAPI.postUserData({
                username: this.state.username,
                password: this.state.password,
                fullname: this.state.fullname,
                email: this.state.email,
                phone: this.state.phone,
                age: this.state.age,
                psn: this.state.psn,
                live: this.state.live,
                steam: this.state.steam,
            })
            .then(res => {
                this.clearUserData();
            })
            .catch(err => console.log(err));
        };
    };


    handleChange = (prop) => (event) => {
        this.setState({ ...this.state, [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState({ ...this.state, showPassword: !this.state.showPassword });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleChangeAge = (event) => {
        const age = event.target.value;
        this.setState({
            age: age,
        });
    };


    render() {
        const classes = useStyles;
        // create option for the age.
        const optAge = [];
        for(let i = 1; i < 101; i++){
            const age = i;
            optAge.push(age);
        }
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div className={classes.root} style={{margin: "15px auto", width: "75%"}} id='form'>
                    <form onSubmit={this.handleFormSubmit}>
                        <Paper>
                            <Grid
                                container
                                spacing={3}
                                alignItems="center"
                                justify="center"
                                style={{ minHeight: '75vh', width: '90%', margin: '0 auto' }}
                            >
                                <Grid item xs>
                                    <Typography variant="h5" component="h2" style={{margin: "10px"}}>Create your account:</Typography>
                                </Grid>
                                <Grid 
                                    container 
                                    spacing={3}
                                    alignItems="center"
                                >
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor="username">Username:</InputLabel>
                                            <Input 
                                                required
                                                id="username" 
                                                aria-describedby="username-helper"
                                                value={this.state.username}
                                                onChange={this.updateInput.bind(this)}
                                            />
                                            <FormHelperText id="username-helper">Enter your desirable username</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor="email">Email:</InputLabel>
                                            <Input 
                                                required
                                                id="email"
                                                aria-describedby="email-helper"
                                                value={this.state.email}
                                                onChange={this.updateInput.bind(this)}
                                            />
                                            <FormHelperText id="email-helper">Enter a valid Email</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor="password">Password:</InputLabel>
                                            <Input 
                                                required
                                                id="password"
                                                aria-describedby="password-helper"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >   
                                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText id="email-helper">Password must contain numbers and letters.</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid 
                                    container 
                                    spacing={3}
                                    alignItems="center"
                                >
                                    <Grid item xs={6}>
                                        <FormControl style={{ width: '100%'}}>
                                            <InputLabel htmlFor="fullname">Full Name:</InputLabel>
                                            <Input 
                                                id="fullname" 
                                                aria-describedby="fullname-helper"
                                                value={this.state.fullname}
                                                onChange={this.updateInput.bind(this)}
                                            />
                                            <FormHelperText id="fullname-helper">Enter your full name</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor="phone">Phone:</InputLabel>
                                            <Input 
                                                id="phone"
                                                aria-describedby="phone-helper"
                                                value={this.state.phone}
                                                onChange={this.updateInput.bind(this)}
                                            />
                                            <FormHelperText id="email-helper">Enter a valid phone number</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor='age'>Age:</InputLabel>
                                            <NativeSelect
                                                value={this.state.age}
                                                onChange={this.handleChangeAge}
                                                id="age"
                                                aria-describedby="age-helper"
                                            >   
                                                <option value=""></option>
                                                { optAge.map((age, i) => {
                                                    console.log(age, i);
                                                    return (<option value={age}>{age}</option>)
                                                })}
                                            </NativeSelect>
                                            <FormHelperText id="age-helper">Select your age</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid 
                                    container 
                                    spacing={3}
                                    alignItems="center"
                                >
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor='psn'>PSN User</InputLabel>
                                            <Input 
                                                id="psn"
                                                aria-describedby="psn-helper"
                                                value={this.state.psn}
                                                onChange={this.updateInput.bind(this)}
                                            />
                                            <FormHelperText id="psn-helper">Enter your PSN username</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor='live'>Xbox Live User</InputLabel>
                                            <Input 
                                                id="live"
                                                aria-describedby="live-helper"
                                                value={this.state.live}
                                                onChange={this.updateInput.bind(this)}
                                            />
                                            <FormHelperText id="live-helper">Enter your Live username</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs>
                                        <FormControl>
                                            <InputLabel htmlFor='steam'>Steam User</InputLabel>
                                            <Input 
                                                id="steam"
                                                aria-describedby="steam-helper"
                                                value={this.state.steam}
                                                onChange={this.updateInput.bind(this)}
                                            />
                                            <FormHelperText id="steam-helper">Enter your STEAM username</FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <span>
                                        <Button
                                            style={{margin: "1em"}}
                                            disabled={!(this.state.username && this.state.password)}
                                            onClick={this.handleFormSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </span>
                                </Grid>
                            </Grid>
                        </Paper> 
                    </form>
                </div>
            );
        }
    };
};

export default UserCreate;