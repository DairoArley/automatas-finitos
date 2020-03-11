import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./componentes/Header";
import Pasos from "./componentes/Pasos";
import PasosInferior from "./componentes/PasosInferior";
import Instructions from "./componentes/Instrucciones";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import automata from "./dominio/dominio";
import AutomataFinitoTabla from "./componentes/AutomataFinitoTabla";
import datos from "./database/datos";
import Señuelo from "./componentes/Señuelo";
import Navegacion from "./componentes/Navegacion";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(100),
      height: theme.spacing(30)
    }
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

  const handleShow = () => {
    switch (activeStep) {
      case 0:
        return <Instructions
        style={{ justifyContent: "center" }}
        titulo={"Intrucciones"}
        instruccion={getStepContent(activeStep)}
        severidad={"info"}
      />
      case 1:
        return <AutomataFinitoTabla automata={automata}/>
      case 2:
        // code block
        break;
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
    <div style={{transform: "translate(-50% , -50%)"}}>
      <Header />
      <Pasos activeStep={activeStep} steps={steps} />
      <Instructions
        style={{ justifyContent: "center" }}
        titulo={"Intrucciones"}
        instruccion={getStepContent(activeStep)}
        severidad={"info"}
      />
      <Paper className={classes.paper} elevation={20}>
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
