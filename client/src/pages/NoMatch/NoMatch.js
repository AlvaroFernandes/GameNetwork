import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = {
    main: {
        color: "red",
    },
};

function NoMatch(props) {
    const { classes } = props;
    return (
        <div>
            <Typography variant="h6" color="inherit" className={classes.main}>
                The page you are looking for is not found.
                Please return <Link to="/">Home</Link>
            </Typography> 
        </div>
    )
};

export default withStyles(styles)(NoMatch);