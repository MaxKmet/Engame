import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const synonymsGameFrameStyles = makeStyles((theme) => ({
    root: {
      margin: 'auto',
      width: '100%',
      maxWidth: 600,
      backgroundColor: theme.palette.background.paper,
    },
    mainChip: {
      margin: theme.spacing(0.2),
      size: 'large',
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }));

const synonymsGameFrameClasses = synonymsGameFrameStyles()

  
export {synonymsGameFrameClasses};