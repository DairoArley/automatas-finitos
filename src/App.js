import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./componentes/Header";
import Pasos from "./componentes/Pasos";
import PasosInferior from "./componentes/PasosInferior";
import Instructions from "./componentes/Instrucciones";
import automata from "./dominio/dominio";
import AutomataFinitoTabla from "./componentes/AutomataFinitoTabla";
import datos from "./database/datos";
import IngresoDatos from "./componentes/IngresoDatos";
import Animacion from "./componentes/animacion/Animacion";

const useStyles = makeStyles(theme => ({
  paper: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  }
}));

function getSteps() {
  return datos[0];
}
function getStepContent(step) {
  return datos[1][step];
}
export default function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const maxSteps = steps.length;
  const classes = useStyles();
  const [expresionRegular, setExpresionregular] = React.useState("");

  const handleShow = () => {
    switch (activeStep) {
      case 0:
        return <IngresoDatos er={expresionRegular} mod={setExpresionregular}/>;
      case 1:
        return <Animacion/>;        
      case 2:
        return <AutomataFinitoTabla automata={automata} />
      case 3:
        // code block
        break;
      case 4:
        // code block
        break;
      default:
      // code block
    }
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <div style={{ display: "block" }}>
      <Header />
      <Pasos activeStep={activeStep} steps={steps} />
      <Paper className={classes.paper} elevation={5}>
        <Instructions
          titulo={"Intrucciones"}
          instruccion={getStepContent(activeStep)}
          severidad={"info"}
        />
        {handleShow()}
      </Paper>

      <PasosInferior
        activeStep={activeStep}
        maxSteps={maxSteps}
        handleBack={handleBack}
        handleNext={handleNext}
        handleReset={handleReset}
      />
    </div>
  );
}
