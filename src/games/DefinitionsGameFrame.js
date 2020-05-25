import React from 'react';

import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


export default class DefinitionsGameFrame extends React.Component {

  constructor({ classes }) {
    super();

    this.state = {
      numOptions: 4,
      definition: "Please press NEXT to start a game",
      words: [{ word: "Word1", correct: false, color: "primary" }, { word: "Word2", correct: true, color: "primary" },
      { word: "Word3", correct: false, color: "primary" }, { word: "Word4", correct: false, color: "primary" }],
      classes: classes,
      points: 10,
    };

  }

  checkSelection(e, predictedWord) {
    e.preventDefault();
    let addPoints = 0;
    let correctWord = this.state.words.find((word) => word.correct).word;
    if (predictedWord == correctWord) {
      addPoints = 10;
    }

    this.setState((state) => ({
      words: state.words.map((word) => ({ word: word.word, correct: word.correct, color: word.correct ? "secondary" : "primary" })),
      points: state.points + addPoints
    }))

  }

  getRequestsForDefinition(words){
    words = words.map( word => word.replace(" ","_"));
    let requests_definition = words.map( name => fetch("https://wordsapiv1.p.rapidapi.com/words/"+ name +"/definitions", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "e35230f3b8msh39f53e53d676724p1619c3jsn99097ecfe42a"
      }
    }));
    return requests_definition;
  }


  updateEverything(e) {
    e.preventDefault();

    var correct_word_def = ""
    var correctWord = ""
    var words_definitions = []
    this.setState((state) => ({
      definition: ""      
    }))

    var updatedSuccessfully = false;

    
    let names = ['iliakan', 'remy', 'jeresig', "hello"];
    let requests = names.map(_ => fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "e35230f3b8msh39f53e53d676724p1619c3jsn99097ecfe42a"
      }
    }));

    var random_words = [];

    Promise.all(requests)
      .then(responses => {
        return responses;
      })
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(results => {
        console.log("BASIC RESULTS")
        
        random_words = results.map((res) => (res.word));
        random_words = random_words.filter(word => (word != undefined) && (word.length > 6));
        console.log(random_words)
        //REMOVE
        
      }).then(()=>{
      
    
    Promise.all(this.getRequestsForDefinition(random_words))
      .then(responses => {
        return responses;
      })
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(results => {
       results = results.filter(res => !("success" in res));
       words_definitions = results.map((res) => ({ "word": res.word, "definition": res.definitions }));
       words_definitions =  words_definitions.filter(word => word != undefined);
       console.log("DEFS RESPONSES: ")
       console.log(results)
       
       var word;
       console.log("WORD_DEFS")
       console.log(words_definitions)
       for(word of words_definitions){
         console.log(word);

         console.log(word)
         if ((word["definition"]) && (word["definition"].length > 0)){           
           correctWord = word["word"]
           correct_word_def = word["definition"][0]["definition"]
           
         }


       }
      
           

      }).then(()=>{
        if(correct_word_def){    
        this.setState((state) => ({
          definition: correct_word_def,
          words: words_definitions.map((res) => ({key: res.word + correctWord,  word: res.word, correct: res.word == correctWord, color: "primary" })),
        }))
        
      }
      else{
        this.setState((state) => ({
          definition: "Bad API response, press NEXT again",          
        }))
      }
      })
    })
  


  
}

  resetWords() {
    for (let i = 0; i < this.state.numOptions; i++) {
      fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": "e35230f3b8msh39f53e53d676724p1619c3jsn99097ecfe42a"
        }
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState((state) => ({
              words: state.words.concat([{ word: result.word, correct: false, color: "primary" }]),
            }))
          },
          (error) => {
            this.setState({
              definition: error,
              words: []
            });
          }
        )
    }
  }

  getUpdatedWords() {
    return Promise.all([this.resetWords()])
  }

  resetField(e) {
    e.preventDefault();

    this.setState((state) => ({
      words: [],
    }))


    this.getUpdatedWords().then(() => {

      let correctWordInd = Math.floor(Math.random() * this.state.numOptions);
      let correctWord = this.state.words[0].word;

      fetch("https://wordsapiv1.p.rapidapi.com/words/" + correctWord + "/definitions", {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
          "x-rapidapi-key": "e35230f3b8msh39f53e53d676724p1619c3jsn99097ecfe42a"
        }
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState((state) => ({
              words: state.words.map((word) => ({ word: word.word, correct: correctWord == word.word, color: word.color })),
              definition: result["definitions"]["definition"]

            }))
          },
          (error) => {
            this.setState({
              definition: error,
              words: []
            });
          }
        )
    })



  }

  render() {
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
        <Divider variant="middle" />
        <div className={this.state.classes.section2}>
          <div>
            {this.state.words.map((wordItem) => (
              <Chip onClick={(e) => this.checkSelection(e, wordItem.word)} key={wordItem.word} color={wordItem.color} className={this.state.classes.chip} label={wordItem.word} />
            ))}
            <Chip onClick={(e) => this.updateEverything(e)} color="primary" className={this.state.classes.chip} label="NEXT" />

          </div>
        </div>
        <div className={this.state.classes.section3}>
          <Button color="primary">Score: {this.state.points}</Button>
        </div>
      </div>
    );
  }
}

