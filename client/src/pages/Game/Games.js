import React, { Component } from 'react';
import { Chip, Grid, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import api from '../../utils/API';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import ReactPlayer from 'react-player';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(0.5),
        },
    },
    img: {
        maxWidth: 'inherit',
    }
})

class Games extends Component {
    state={
        _id: this.props._id,
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
    
    addGame(id){
        const userId = this.state._id;
        const gameId = id;

        console.log(gameId, userId);

    }

    
    render(){
        const { classes } = this.props;
        console.log(this.state.data);
        return(
            <div className={classes.root}>
                 {!this.state.data ? (
                     <div></div>
                 ):(
                     
                    <div>
                        <div className={classes.appBarSpacer} />
                        <div>
                            <Grid container direction="row" justify="center" spacing={0}>
                                <Grid item xs={12}>
                                    <img className={ classes.img } src={this.state.data.img} alt={this.state.data.name}/>
                                    <Button variant='contained' color="primary" style={{ float: 'right' }} onClick={this.addGame(this.state.data.id)} startIcon={<AddCircleOutlineIcon />}>
                                        ADD
                                    </Button>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h2" style={{ textAlign: 'center'}}>
                                        {this.state.data.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    {
                                        this.state.data.platforms.map(e => {
                                            return <Chip style={{margin: 5}} key={e.platform.id} label={e.platform.name}/>
                                        })
                                    }
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'center', padding: '2'}}>
                                    <Typography>
                                        Genres:
                                    </Typography>
                                    {
                                        this.state.data.genres.map(e => {
                                            return <Chip style={{margin: 5}} key={e.id} label={e.name}/>                                           
                                        })
                                    }
                                </Grid>
                                <Grid item xs={12} style={{margin: 5}}>   
                                    <Grid container direction="row" spacing={3}>
                                        <Grid item xs={6}>                                            
                                            <Paper style={{margin: 3, padding: 3}}>
                                                <Typography>
                                                    Description:
                                                </Typography>
                                                {ReactHtmlParser(this.state.data.description)}
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ReactPlayer url={this.state.data.video.clip} controls={true} />
                                        </Grid>
                                    </Grid>
                                </Grid> 
                            </Grid>
                        </div>
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