import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: 280,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  }
});

export default function IngresoDatos(props) {
  const classes = useStyles();
  const [mostrarExpresion, setMostrarExpresion] = useState(false);

  const handleChange = (e) => {
    props.mod(e.target.value);
  }
  const handleView = () => {
    setMostrarExpresion(!mostrarExpresion);    
  } 

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Ingreso de la Expresión regular
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Tenga en cuenta que con los simbolos '|', '.', '*' y '+' se representa la Unión, 
          Concatenación, Clausura y Clausura que no incluye secuencia nula, correspondientemente.
        </Typography>
        {
          mostrarExpresion ?
          <Chip
          icon={<EmojiSymbolsIcon/>}        
          label={props.expresionRegular}
          style={{justifyContent: "center", padding:"15px"}}    
          clickable
          size="medium"
          color="primary"
          onDelete={handleView}
        />
          :(
          <TextField
          label="Expresión regular"
          style={{ margin: 8 }}
          placeholder="Digite la expresion regular"
          fullWidth
          value = {props.expresionRegular}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />)}
      </CardContent>
      {mostrarExpresion? null :
      <CardActions>
        <Button size="medium" color="primary" onClick={handleView} >Guardar</Button>
      </CardActions>
      }
    </Card>
  );
}
