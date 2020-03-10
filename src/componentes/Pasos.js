import { makeStyles, withStyles } from "@material-ui/core/styles";
import StepConnector from "@material-ui/core/StepConnector";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import InputIcon from '@material-ui/icons/Input';
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import React from "react";
import clsx from "clsx";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage:
      "linear-gradient(0deg, rgba(113,243,245,1) 5%, rgba(17,120,181,0.3841911764705882) 80%);"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient(0deg, rgba(113,243,245,1) 5%, rgba(17,120,181,0.3841911764705882) 80%);"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient(0deg, rgba(113,243,245,1) 5%, rgba(17,48,181,1) 80%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient(0deg, rgba(113,243,245,1) 5%, rgba(17,48,181,1) 80%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <InputIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  rooter: {
    maxWidth: 400,
    flexGrow: 1
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 255,
    maxWidth: 400,
    overflow: "hidden",
    display: "block",
    width: "100%"
  }
}));

export default function Pasos(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={props.activeStep}
        connector={<ColorlibConnector />}
      >
        {props.steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
