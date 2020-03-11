import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Fab } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import StorageIcon from "@material-ui/icons/Storage";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import TableFooter from '@material-ui/core/TableFooter';

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

const CuandoDebaRechazarLaExpresion = props => {
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
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <PostAddIcon />
          </IconButton>
        </Tooltip>
      )}
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
  colorRecha: {
    backgroundColor: "#D53007"
  },
  colorAcep: {
    backgroundColor: "#14E05E"
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

export default function AutomataFinitoTabla(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table className={classes.table} size="small" stickyHeader={true}>
          <caption>Se asume que el primer estado, es el estado Inicial</caption>
            <TableHead >
              <TableRow>
                <TableCell align="center" style={{ backgroundColor: "#D3F0F7"}}>
                  <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    key={"estados"}
                  >
                    <StorageIcon style={{ marginRight: 6}} />
                    Estados
                  </Fab>
                </TableCell>
                {props.automata.entradas.map(entrada => (
                  <TableCell align="center" key={entrada} style={{ backgroundColor: "#D3F0F7"}}>
                    {entrada}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ backgroundColor: "#D3F0F7"}}>
                  <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    key={"aceptacion"}
                  >
                    <DoneAllIcon style={{ marginRight: 6}} />
                    Aceptación
                  </Fab>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.automata.trancisiones.map(transicion => (
                <TableRow hover={true} key={transicion.nombre}>
                  <TableCell component="th" scope="row" align="center">
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      key={"aceptacion"}
                    >
                      <DoubleArrowIcon style={{ margin: 5 }} />
                      {transicion.nombre}
                    </Fab>
                  </TableCell>
                  {transicion.estados.map(estado => (
                    <TableCell
                      component="td"
                      scope="row"
                      align="center"
                      key={estado.nombre + estado.entrada}
                    >
                      {estado.nombre}
                    </TableCell>
                  ))}
                  {transicion.aceptacion ? (
                    <TableCell align="center">
                      <Fab size="small">
                        <CheckIcon style={{ color: "#21DF58" }} />
                      </Fab>
                    </TableCell>
                  ) : (
                    <TableCell align="center">
                      <Fab size="small">
                        <CloseIcon style={{ color: "#F04F18" }} />
                      </Fab>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
