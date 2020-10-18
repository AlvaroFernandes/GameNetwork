import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { InputLabel, FormControl, Input, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function UserForm() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper>
            <form id="userCreate">  
                <Grid container spacing={3}>
                    <Grid item xs>
                        <FormControl>
                            <InputLabel htmlFor="username">Username:</InputLabel>
                            <Input id="username" aria-describedby="username-helper" />
                            <FormHelperText id="username-helper">Enter your desirable username</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <FormControl>
                            <InputLabel htmlFor="username">Username:</InputLabel>
                            <Input id="username" aria-describedby="username-helper" />
                            <FormHelperText id="username-helper">Enter your desirable username</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                    </Grid>
                </Grid>
            </form>
      </Paper>
    </div>
  );
}