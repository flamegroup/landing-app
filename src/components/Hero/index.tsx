import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useLayoutEffect, useRef } from 'react';

const useStyles = makeStyles({
  hero: {
    overflow: 'hidden',
    position: 'relative',
    height: '57vw',
    minHeight: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    '& h2': {
      color: '#363636',
      fontSize: '32px',
      margin: '0 20px',
      height: 'fit-content',
    },
    '& p': {
      color: '#363636',
      fontSize: '26px',
      margin: '0 20px',
      height: 'fit-content',
    },
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  videoHero: {
    opacity: '0.4',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    videoRef.current?.play();
  });

  const classes = useStyles();
  return (
    <Grid item container xs={12}>
      <Grid item xs={12} className={classes.hero}>
        <h2>Aliquam erat volu tpat</h2>
        <p>Ut est quam, feugiat eget tristique sed, tincidunt non enim</p>
        <Grid item xs={12} className={classes.videoContainer}>
          <video
            className={classes.videoHero}
            muted
            loop
            ref={videoRef}
            playsInline>
            <source
              src='https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/flame%20intro%202.mp4?alt=media&token=3f4bd3a5-b814-465e-b532-5237a761c4bb'
              type='video/mp4'
            />
          </video>
        </Grid>
      </Grid>
    </Grid>
  );
}
