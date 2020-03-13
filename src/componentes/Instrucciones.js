import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import GTranslateIcon from '@material-ui/icons/GTranslate';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",    
    justifyContent: "center",
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  fab: {
    position: 'absolute',
    right: theme.spacing(2),
  }
}));

export default function Instrucciones(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Fab color="primary"  onClick={handleClick} className={classes.fab}>
        <GTranslateIcon />
      </Fab>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severidad}>
          {props.instruccion}
        </Alert>
      </Snackbar>
 
    </div>
  );
}
