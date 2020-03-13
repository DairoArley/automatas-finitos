import { useTheme } from "@material-ui/core/styles";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import React from "react";

export default function PasosInferior(props) {
  const theme = useTheme();
  return (
    <MobileStepper
      steps={props.maxSteps}
      position="bottom"
      variant="progress"
      activeStep={props.activeStep}
      nextButton={
        <Button
          size="large"
          onClick={props.handleNext}
          disabled={props.activeStep === props.maxSteps - 1}
        >
          Siguiente
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
          size="large"
          onClick={props.handleBack}
          disabled={props.activeStep < props.activeStep+1}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Anterior
        </Button>
      }
    />
  );
}
