import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import HeaderLogo from './HeaderLogo';

const useStyles = makeStyles({
  header: {
    width: '100%',
    height: '100px',
    backgroundColor: '#2B2B2D',
    opacity: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    boxShadow: '0 6px 6px rgba(0,0,0,0.4)',
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <Grid item container xs={12}>
      <div className={classes.header}>
        <HeaderLogo />
      </div>
    </Grid>
  );
}
