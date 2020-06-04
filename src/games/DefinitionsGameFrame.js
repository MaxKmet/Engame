import React from 'react';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


export default class DefinitionsGameFrame extends React.Component  {

  constructor({classes}) {
    super();

    this.state = {
      definition: "A long definition of a difficult term in English",
      words: [["Word1", false],["Word2", true], ["Word3", false], ["Word4", false]],
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
              What is word for this definition ?
            </Typography>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
        <Typography gutterBottom variant="body1">
              {this.state.definition}
        </Typography>
      </div>
      <Divider variant="middle"/>
      <div className={this.state.classes.section2}>
        <div>
        {this.state.words.map((wordItem) => (
          <Chip key={wordItem[0]} className={this.state.classes.chip} label= {wordItem[0]} />          
        ))} 
        </div>
      </div>
      <div className={this.state.classes.section3}>
        <Button color="primary">Score: {this.state.points}</Button>
      </div>
    </div>
  );
  }
}

