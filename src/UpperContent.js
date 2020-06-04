import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function UpperContent ({ classes }){
return(<div className={classes.upperContent}>
          
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              ENGAMES
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Collection of games for English lovers
            </Typography>
          </Container>
        </div>);
}


