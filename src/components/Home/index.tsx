import { createTheme, Grid, ThemeProvider } from '@material-ui/core';
import React from 'react';
import AboutUs from '../AboutUs';
import Form from '../Form';
import Header from '../Header';
import Hero from '../Hero';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container>
        <Header />
        <Hero />
        <AboutUs />
        <Form />
      </Grid>
    </ThemeProvider>
  );
}
