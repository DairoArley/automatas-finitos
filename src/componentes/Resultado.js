import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Resultado(props) {
  const classes = useStyles();
  const [hilera, setHilera] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [mostrarInput, setMostrarInput] = useState(true);

  const handleChange = (e) => {
    setHilera(e.target.value);
  };
  const handleValidate = () => {
    const nada = props.search(props.nfa, hilera);
    console.info(nada);
    setMostrarInput(!mostrarInput);
  }

  return (
    <div className={classes.root}>
        {
            mostrarInput?
                <div>
                    <TextField
                        label="Expresión regular"
                        style={{ margin: 8 }}
                        placeholder="Digite la hilera"
                        fullWidth
                        value={hilera}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="outlined"
                    />
                    <CardActions>
                        <Button size="medium" color="primary" onClick={handleValidate}>
                        Validar
                        </Button>
                    </CardActions>

                </div>

            :   mostrarResultado?
                
                <Alert severity="success">La hilera pertenece al automata</Alert>
                :
                <Alert severity="error">La hilera no pertenece al automata</Alert>


        }
    </div>
  );
}