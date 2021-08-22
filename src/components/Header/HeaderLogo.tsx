import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  logoImage: {
    width: "130px",
    height: "130px",
    top: "40px !important",
    position: "relative",
    filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.5))",
  },
});

export default function HeaderLogo() {
  const classes = useStyles();
  return (
    <img
      className={classes.logoImage}
      src='https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/LogoTransparent720x720.png?alt=media&token=4dbcc766-b69f-4e93-b6ff-cb54ee71902c'
      alt='Flamme E Sports Club Logo'
    />
  );
}
