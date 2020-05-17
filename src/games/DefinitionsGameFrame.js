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
      words: [{word:"Word1",correct:false, color:"primary"},{word:"Word2",correct:true, color:"primary"}, 
      {word:"Word3",correct:false, color:"primary"}, {word:"Word4",correct:false, color:"primary"}],      
      classes: classes,
      points: 10,
    };
    
  }

  checkSelection(e, predictedWord){
    e.preventDefault();
    let addPoints = 0;
    let correctWord = this.state.words.find((word) => word.correct).word;
    if(predictedWord == correctWord){
      addPoints =10;
    }

    this.setState((state) => ({
      words: state.words.map((word) => ({word: word.word, correct: word.correct, color: word.correct ? "secondary": "primary"})),
      points: state.points + addPoints
    }))

  }

  resetField(e){
    e.preventDefault();
    
    this.setState((state) => ({
      words: [{word:"New1",correct:false, color:"primary"},{word:"New2",correct:true, color:"primary"}, 
      {word:"New3",correct:false, color:"primary"}, {word:"New4",correct:false, color:"primary"}],
    }))
   

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
          <Chip onClick ={(e) => this.checkSelection(e, wordItem.word)} key={wordItem.word} color={wordItem.color} className={this.state.classes.chip} label= {wordItem.word} />          
        ))} 
        <Chip onClick ={(e) => this.resetField(e)} color="primary" className={this.state.classes.chip} label= "NEXT" />

        </div>
      </div>
      <div className={this.state.classes.section3}>
        <Button color="primary">Score: {this.state.points}</Button>
      </div>
    </div>
  );
  }
}

