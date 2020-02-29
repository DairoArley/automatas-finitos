import React from "react";
import Header from "./componentes/Header";
import Pasos from "./componentes/Pasos";
import PasosInferior from "./componentes/PasosInferior";
import Instructions from "./componentes/Instrucciones";

function getSteps() {
  return [
    "Ingresar el Automata Finito",
    "Ingresar expresión regular",
    "Validar ER en el AF"
  ];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return "En este paso usted deberá ingresar el automata finito que desea evaluar";
    case 1:
      return "En este paso usted deberá ingresar la expresión regular que desea evaluar en el actual automata";
    case 2:
      return "En este paso evaluaremos la expresion, Pertenece o no pertenece";
    default:
      return "Paso inexistente";
  }
}
export default function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const maxSteps = getSteps().length;

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
      <Pasos
        activeStep={activeStep}
        steps={steps}
        maxSteps={maxSteps}
      />
      <Instructions
        titulo={"Intrucciones"}
        intruccion={getStepContent(activeStep)}
      />
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
