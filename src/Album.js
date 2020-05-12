import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GameCard from './GameCard';

export default function Album({classes, cards}) {
  return (    
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
            <GameCard key = {card.key} classes ={classes} gameCard={card}/>           
            ))}
          </Grid>
        </Container>
  );
}