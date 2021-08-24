import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    "& h2, h3": {
      fontWeight: "normal",

      paddingInline: "25%",
    },
    "& h2": {
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  },

  divider: {
    width: "30%",
    height: "2px",
    backgroundColor: "#2b2b2d",

    "&::after": {
      content: "''",
      height: "5px",
      display: "block",
      backgroundColor: "#2b2b2d",
      width: "50%",
      margin: "-2px auto 0",
    },
  },
});

export default function AboutUs() {
  const classes = useStyles();

  return (
    <Grid item container xs={12} justifyContent="center">
      <div className={classes.root}>
        <h2> Bienvenido a la familia Flame</h2>

        <div className={classes.divider}></div>

        <h3>
          Esta es la web donde podran inscribirse las personas que deseen
          convertir su pasion en su estilo de vida, además de hacer parte de
          esta gran familia, flame abre sus puertas para aquellos que se crean
          capaces de lograr llevar este club a otro nivel y ser parte de la
          historia de los esports. No esperes mas y registrate!. 
        </h3>

        <Grid item container xs={12} justifyContent="space-evenly">
          <Box m="10px">
            <img
              alt="players"
              src="https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/Rectangle%2010.jpg?alt=media&token=8ac3b367-43f1-4936-a1b5-ffab2e49e75f"
            />
          </Box>
          <Box m="10px">
            <img
              alt="gamming office"
              src="https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/Rectangle%2011.jpg?alt=media&token=f6b69106-6e8b-43dd-ba77-fb21a0318e0b"
            />
          </Box>
          <Box m="10px">
            <img
              alt="player"
              src="https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/Rectangle%209.jpg?alt=media&token=aa1452fe-445f-4848-ae77-66ab906c0298"
            />
          </Box>
        </Grid>
      </div>
    </Grid>
  );
}
