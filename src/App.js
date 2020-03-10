import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./componentes/Header";
import Pasos from "./componentes/Pasos";
import PasosInferior from "./componentes/PasosInferior";
import Instructions from "./componentes/Instrucciones";
import automata from "./dominio/dominio";
import AutomataFinitoTabla from "./componentes/AutomataFinitoTabla";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(3),
      width: theme.spacing(100),
      height: theme.spacing(45)
    }
  }
}));

const datos = [
  [
    "Ingresar el Automata Finito",
    "Ingresar expresión regular",
    "Validar ER en el AF"
  ],
  [
    "En este paso usted deberá ingresar el automata finito que desea evaluar",
    "En este paso usted deberá ingresar la expresión regular que desea evaluar en el actual automata",
    "En este paso evaluaremos la expresion, Pertenece o no pertenece"
  ]
];

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
    <div>
      <Header />
      <Pasos activeStep={activeStep} steps={steps} maxSteps={maxSteps} />
      <Instructions
        style={{ justifyContent: "center", alignSelf: "center" }}
        titulo={"Intrucciones"}
        instruccion={getStepContent(activeStep)}
        severidad={"info"}
      />
      <Paper className={classes.paper} elevation={20}>
        <AutomataFinitoTabla automata={automata} />
      </Paper>
      <PasosInferior
        activeStep={activeStep}
        steps={steps}
        maxSteps={maxSteps}
        handleBack={handleBack}
        handleNext={handleNext}
        handleReset={handleReset}
      />
    </div>
  );
}
