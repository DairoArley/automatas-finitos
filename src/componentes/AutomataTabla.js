import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Fab } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

function EncabezadoTabla(props) {
  const { entradas } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell scope="tr"></TableCell>
        <TableCell padding="checkbox" stickyHeader={true}></TableCell>
        {entradas.map(entrada => (
          <TableCell key={entrada} align="center">
            {entrada.label}
          </TableCell>
        ))}
        <TableCell>Aceptación</TableCell>
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

const BarraHerramientasTabla = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          automata
        </Typography>
      )}
      <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function AutomataTabla(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <BarraHerramientasTabla numSelected={-1} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EncabezadoTabla
              classes={classes}
              numSelected={-1}
              entradas={props.automata.entradas}
            />
            <TableBody>
              {props.automata.trancisiones.map(trancision => {
                return (
                  <TableRow hover>
                    <TableCell padding="checkbox">
                      {trancision.nombre}
                    </TableCell>
                    {trancision.estados.map(estado => {
                      return (
                        <TableCell component="th" scope="row" padding="none">
                          {estado.nombre}
                        </TableCell>
                      );
                    })}
                    <TableCell padding="checkbox">
                      {trancision.nombre}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
