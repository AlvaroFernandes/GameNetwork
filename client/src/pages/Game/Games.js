import React, { Component } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import api from '../../utils/API';
import PropTypes from 'prop-types';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,

    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundSize: 'auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        minHeight: 400,
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
      },
})

class Games extends Component {
    state={
    }
    componentDidMount(){
        const gameId = this.props.match.params.id;
        this.loadGame(gameId);
    }

    loadGame(id){
        console.log(id);
        api.getGame(id)
        .then(res => {
            console.log(res);
            if(res.status === 200){
              this.setState({
                  data: res.data,
              })
            }
        }).catch(error => {
            console.log(error);
        })
    }
    

    
    render(){
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                 {!this.state.data ? (
                     <div></div>
                 ):(
                    <div>
                        <div className={classes.appBarSpacer} />
                        <main>
                        <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: 'url(' + this.state.data.img + ')'}}>
                            <div className={classes.overlay} />
                            <Grid container justify='center'>
                                <Grid item md={6}>
                                    <div classNmae={classes.mainFeaturedPostContent}>
                                        <Typography component='h1' variant='h3' color='inherit' gutterButton>
                                            {this.state.data.name}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md="10">
                                    <div
                                </Grid>
                            </Grid>
                        </Paper>
                        </main>
                    </div>
                 )}
            </div>      
        )
    }
}

Games.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(useStyles)(Games);