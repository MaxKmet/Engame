import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const GameCard = ({ classes, gameCard }) => (
  <Grid item xs={12} sm={6} md={4}>
  <Card className={classes.card}>
    <CardMedia
      className={classes.cardMedia}
      image={gameCard.image}
      title={gameCard.title}
    />
    <CardContent className={classes.cardContent}>
      <Typography gutterBottom variant="h5" component="h2">
      {gameCard.title}
      </Typography>
      <Typography>
        {gameCard.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button href={gameCard.link} size="large" color="primary">
        Play
      </Button>      
    </CardActions>
  </Card>
</Grid>
);

export default GameCard;