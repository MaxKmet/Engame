import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ReactAudioPlayer from 'react-audio-player';


export default class AudioGameFrame extends React.Component  {

  constructor({classes}) {
    super();

    this.state = {
      audio: "Sample Audio",
      correctWord: "Main Word",
      classes: classes,
      points: 10,
    };
    
  }
  
  render(){
  return (
    <div className={this.state.classes.root}>
      <div className={this.state.classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              Type in the word you hear
            </Typography>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>        
        <ReactAudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
          autoPlay
          controls
        />
      </div>
      <Divider variant="middle"/>
      <div className={this.state.classes.section2}>
        <div>
        <form className={this.state.classes.root} noValidate autoComplete="off">        
        <TextField id="outlined-basic" label="Type here" variant="outlined" />
      </form>
      <Chip className={this.state.classes.chip} label= "Submit" /> 
        </div>
      </div>
      <div className={this.state.classes.section3}>
        <Button color="primary">Score: {this.state.points}</Button>
      </div>
    </div>
  );
  }
}

