import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Footer from './Footer';
import TopBar from './TopBar';
import './App.css';

import {useStyles, theme, cards} from './AppStyles'
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SynonymsGameFrame from './games/SynonymsGameFrame'
import DefinitionsGameFrame from './games/DefinitionsGameFrame'
import AudioGameFrame from './games/AudioGameFrame'
import MainPageContent from './MainPageContent'


function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
      <CssBaseline />
      <TopBar classes={classes} text="Engames" />

      <main> 
      <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' component={(props)=><MainPageContent {...props} classes={classes} cards={cards}/>}/>
        <Route exact={true} path='/synonymsGame' render={()=><SynonymsGameFrame  classes={classes}/>}/>
        <Route exact={true} path='/definitionsGame' render={()=><DefinitionsGameFrame   classes={classes}/>}/>
        <Route exact={true} path='/audioGame' render={()=><AudioGameFrame classes={classes}/>}/>
      </Switch>
      </BrowserRouter>
      </main>

      <Footer classes={classes} text={"Learn with pleasure!"}/>
      </React.Fragment>
    
    </ThemeProvider>

  );
}

export default App;
