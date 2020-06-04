import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


export default class AudioGameFrame extends React.Component {

  constructor({ classes }) {
    super();

    this.state = {
      transcription: "",
      correctWord: "hello",
      message: "Press NEXT to start a game",
      predictedWord: "",
      classes: classes,
      points: 0,
    };

  }

  validInput(e, text) {
    e.preventDefault();
    let reg = /^[a-zA-Z0\s\-]+$/
    var pattern = new RegExp(reg);
    if (text !== '' && pattern.test(text)) {
      this.setState((state) => ({
        message: "",
        predictedWord: text.toLowerCase().trim()
      }))
    }
    else {
      this.setState((state) => ({
        message: "Only letters, spaces and hyphens allowed"
      }))

    }
  }

  getRequestsForTranscription(words) {
    words = words.map(word => word.replace(" ", "_"));
    let requests_definition = words.map(name => fetch("https://wordsapiv1.p.rapidapi.com/words/" + name + "/pronunciation", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "e35230f3b8msh39f53e53d676724p1619c3jsn99097ecfe42a"
      }
    }));
    return requests_definition;
  }

  checkSelection(e) {
    e.preventDefault();
    let addPoints = 0;
    let cur_message = "answer: " + this.state.correctWord
    if (this.state.predictedWord == this.state.correctWord) {
      addPoints = 10;
      cur_message = "CORRECT! " + cur_message;
    }
    else {
      cur_message = "WRONG! " + cur_message;
    }

    this.setState((state) => ({
      points: state.points + addPoints,
      message: cur_message
    }))

  }

  updateEverything(e) {
    e.preventDefault();

    var correct_word_trancript = ""
    var corWord = ""
    var words_trans = []
    this.setState((state) => ({
      predictedWord: "",
      correctWord: "",
      transcription: "",
      message: "",
    }))

    let requests = [];
    requests.push(fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": "e35230f3b8msh39f53e53d676724p1619c3jsn99097ecfe42a"
      }
    }))

    var random_words = [];
    Promise.all(requests)
      .then(responses => {
        return responses;
      })
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(results => {
        console.log("BASIC RESULTS")

        random_words = results.map((res) => (res.word));
        random_words = random_words.filter(word => (word != undefined) && (word.length > 4));
        console.log(random_words)
      }).then(() => {
        Promise.all(this.getRequestsForTranscription(random_words))
          .then(responses => {
            return responses;
          })
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(results => {
            results = results.filter(res => !("success" in res));
            words_trans = results.map((res) => ({ "word": res.word, "trans": res.pronunciation }));
            words_trans = words_trans.filter(word => word != undefined);

            var word;
            for (word of words_trans) {
              console.log(word);

              console.log(word)
              if ((word["trans"]) && (word["trans"]["all"])) {
                corWord = word["word"]
                correct_word_trancript = word["trans"]["all"]
              }
            }

          }).then(() => {
            if (correct_word_trancript) {
              this.setState((state) => ({
                transcription: correct_word_trancript,
                correctWord: corWord,
                message: ""
              }))
            }
            else {
              this.setState((state) => ({
                message: "Bad API response, press NEXT again",
              }))
            }
          })
      })

  }



  render() {
    return (
      <div className={this.state.classes.root}>
        <div className={this.state.classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h5">
                Type in the word with the following transcription:
            </Typography>
              <Typography gutterBottom variant="h5">
                {this.state.transcription}
              </Typography>
              <Typography gutterBottom color="error" variant="subtitle1">
                {this.state.message}
              </Typography>

            </Grid>
            <Grid item>
            </Grid>
          </Grid>

        </div>
        <Divider variant="middle" />
        <div className={this.state.classes.section2}>
          <div>
            <form className={this.state.classes.root} noValidate autoComplete="off">
              <TextField id="outlined-basic" pattern="^[A-Za-z\s\-]+$" onChange={(e) => this.validInput(e, e.target.value)} label="Type here" variant="outlined" />
            </form>
            <Chip className={this.state.classes.chip} onClick={(e) => this.checkSelection(e)} label="Submit" />
            <Chip className={this.state.classes.chip} onClick={(e) => this.updateEverything(e)} label="NEXT" />
          </div>
        </div>
        <div className={this.state.classes.section3}>
          <Button color="primary">Score: {this.state.points}</Button>
        </div>
      </div>
    );
  }
}

