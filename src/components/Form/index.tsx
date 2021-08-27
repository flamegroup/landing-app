import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { db, fire } from '../../firebase';
import FormModel from '../../FormModelData';

import { ReactComponent as CameraIcon } from '../../camera.svg';

const useStyles = makeStyles({
  contactFormSection: {
    backgroundColor: '#2B2B2D',
    color: 'white',
    minHeight: '100%',
    height: 'auto',
  },
  form: {
    width: '100vw',
    maxWidth: '100vw',
    margin: '20px',
  },
  image: {
    width: '100%',
    height: '505.5px',
    maxHeight: '505.5px',
  },
  submitBtn: {
    width: '100%',
    color: 'white',
    margin: '20px auto 10px',
    backgroundColor: '#ff6100',
    padding: '20px',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: '#da1902',
    },
  },
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      padding: '40px',
      textAlign: 'center',
    },
  },
  backdrop: {
    zIndex: 99,
    color: '#fff',
  },
  input: {
    display: 'none',
  },
  uploadBtn: {
    paddingBlock: '15px',
    backgroundColor: '#ff4306',
    width: '100%',
    marginTop: '10px',
  },
  uploadBtnImage: {
    height: '20px',
    width: '20px',
    marginRight: '10px',
  },
  textArea: {
    '& .MuiInputLabel-outlined': {
      maxWidth: '96% !important',
    },
    '& .MuiOutlinedInput-multiline': {
      paddingBlock: '29px',
    },
  },
});

export default function Form() {
  const classes = useStyles();

  const initialValues = {
    game: '',
    name: '',
    lastName: '',
    email: '',
    age: '',
    discord: '',
    question: '',
  };

  const [values, setValues] = useState<FormModel>(initialValues);
  const [errors, setErrors] = useState<FormModel>(initialValues);
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList>();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    debugger;
    if (files !== undefined) {
      formIsValidForSend(files?.length > 0);
    } else {
      formIsValidForSend(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleChange = (
    event: ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    const value = event.target.value as string;
    if (event.target.name === 'question') {
      if (value.length > 230) {
        event.preventDefault();
        return false;
      }
    }

    if (event.target.name) {
      isValid(event.target.name, value);
      setValues({
        ...values,
        [event.target.name]: value,
      });
    }
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files !== null) {
      setFiles(files);
      formIsValidForSend(true);
    }
  };

  const isValid = (name: string, value: string) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (value === '') {
      setErrors({ ...errors, [name]: 'Este campo es requerido' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }

    if (name === 'email') {
      if (emailRegex.test(value)) {
        setErrors({ ...errors, [name]: '' });
      } else {
        setErrors({ ...errors, [name]: 'Email invalido' });
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (files !== undefined) {
      var storage = fire.storage();
      var storageRef = storage.ref();

      for (let i = 0; i < files.length; i++) {
        var uploadTask = storageRef
          .child(`${values.name}_${values.lastName}/` + files[i].name)
          .put(files[i]);

        // eslint-disable-next-line no-loop-func
        uploadTask.on(fire.storage.TaskEvent.STATE_CHANGED, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(() => {});
        });
      }
    }
    setLoading(true);
    await db
      .collection('player-data')
      .doc()
      .set(values)
      .then(() => {
        setLoading(false);
        handleOpen();
      });
  };

  const formIsValidForSend = (filess: boolean) => {
    debugger;
    const valid =
      values.game !== '' &&
      values.name !== '' &&
      values.lastName !== '' &&
      values.email !== '' &&
      errors.email === '' &&
      filess &&
      values.question !== '' &&
      values.discord !== '';
    setValid(!valid);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setValues(initialValues);
    setOpen(false);
    if (ref.current !== null) {
      ref.current.value = '';
    }
  };

  return (
    <Grid container className={classes.contactFormSection}>
      <Grid item container md={3} xs={12} justifyContent='center'>
        <Box>
          {values.game === 'lol' && (
            <img
              className={classes.image}
              src='https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/87a1ef48e43b8cf114017e3ad51b801951b20fcf.jpg?alt=media&token=960c1996-a1db-474d-b098-5c701f3a7598'
              alt='league of legends'
            />
          )}
          {values.game === 'wow' && (
            <img
              className={classes.image}
              src='https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/Centro-WOW.png?alt=media&token=8ca6b70f-ea44-4e8a-8109-457a08b1b41a'
              alt='World of Wardcaraft'
            />
          )}
          {values.game === 'csgo' && (
            <img
              className={classes.image}
              src='https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/counter-strike-global-offensive-caratula.jpg?alt=media&token=422860b4-66a5-4381-bef4-7e6ddee2b8d5'
              alt='Counter Strike'
            />
          )}
          {values.game === 'twitch' && (
            <img
              className={classes.image}
              src='https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/Twitch.jpg?alt=media&token=c82593dc-79bc-422e-ba7a-7780467f00b0'
              alt='twitch'
            />
          )}
          {values.game === 'cod' && (
            <img
              className={classes.image}
              src='https://firebasestorage.googleapis.com/v0/b/flame-group-page.appspot.com/o/unnamed.png?alt=media&token=96f195fc-a23a-4158-9593-05ada93a1169'
              alt='Call of duty'
            />
          )}
        </Box>
      </Grid>
      <Grid item container md={values.game !== '' ? 9 : 12} xs={12}>
        <Grid item xs={12} container justifyContent='center'>
          <h1>Registrate</h1>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant='outlined'>
                <InputLabel id='game-select-label'>Juego preferido</InputLabel>
                <Select
                  fullWidth
                  variant='outlined'
                  labelId='game-select-label'
                  required
                  name='game'
                  value={values.game}
                  onChange={handleChange}
                  id='game'>
                  <MenuItem value='' disabled></MenuItem>
                  <MenuItem value='lol'>League of legends</MenuItem>
                  <MenuItem value='csgo'>Counter Strike: GO</MenuItem>
                  <MenuItem value='wow'>World of Wardcraft</MenuItem>
                  <MenuItem value='cod'>Call of duty</MenuItem>
                  <MenuItem value='twitch'>Creador de contenido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='name'
                required
                fullWidth
                variant='outlined'
                id='name'
                label='Nombre'
                value={values.name}
                onBlur={handleChange}
                onChange={handleChange}
                {...(errors.name !== '' && {
                  helperText: errors.name,
                  error: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name='lastName'
                required
                fullWidth
                variant='outlined'
                id='lastName'
                label='Apellido'
                onBlur={handleChange}
                value={values.lastName}
                onChange={handleChange}
                {...(errors.lastName !== '' && {
                  helperText: errors.lastName,
                  error: true,
                })}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <TextField
                name='email'
                required
                fullWidth
                type='email'
                variant='outlined'
                id='email'
                label='Correo electrónico'
                value={values.email}
                onBlur={handleChange}
                onChange={handleChange}
                {...(errors.email !== '' && {
                  helperText: errors.email,
                  error: true,
                })}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                name='discord'
                required
                fullWidth
                variant='outlined'
                id='text'
                label='Discord'
                value={values.discord}
                onBlur={handleChange}
                onChange={handleChange}
                {...(errors.discord !== '' && {
                  helperText: errors.discord,
                  error: true,
                })}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                name='question'
                required
                fullWidth
                variant='outlined'
                id='text'
                multiline
                minRows={2}
                maxRows={3}
                className={classes.textArea}
                label='Por que te gustaría ser parte de un equipo de e-sports y cuales son tus expectativas?'
                value={values.question}
                onBlur={handleChange}
                onChange={handleChange}
                {...(errors.question !== '' && {
                  helperText: errors.question,
                  error: true,
                })}
              />
            </Grid>

            {values.game === 'lol' && (
              <Grid item xs={8} md={8}>
                <TextField
                  name='riotid'
                  required
                  fullWidth
                  variant='outlined'
                  id='riotid'
                  label='Riot ID'
                  value={values.riotid}
                  onBlur={handleChange}
                  onChange={handleChange}
                  {...(errors.riotid !== '' && {
                    helperText: errors.riotid,
                    error: true,
                  })}
                />
              </Grid>
            )}
            {(values.game === 'wow' || values.game === 'cod') && (
              <Grid item xs={8} md={8}>
                <TextField
                  name='battletag'
                  required
                  fullWidth
                  variant='outlined'
                  id='battletag'
                  label='Battletag'
                  value={values.battletag}
                  onBlur={handleChange}
                  onChange={handleChange}
                  {...(errors.battletag !== '' && {
                    helperText: errors.battletag,
                    error: true,
                  })}
                />
              </Grid>
            )}
            {values.game === 'csgo' && (
              <Grid item xs={12} md={8} justifyContent='center'>
                <TextField
                  name='steamid'
                  required
                  fullWidth
                  variant='outlined'
                  id='steamid'
                  label='Steam ID'
                  value={values.steamid}
                  onBlur={handleChange}
                  onChange={handleChange}
                  {...(errors.steamid !== '' && {
                    helperText: errors.steamid,
                    error: true,
                  })}
                />
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} md={4} justifyContent='center'>
            <input
              accept='image/*'
              id='contained-button-file'
              className={classes.input}
              multiple
              ref={ref}
              onChange={handleUpload}
              type='file'
              required
            />
            <Button
              className={classes.uploadBtn}
              onClick={() => {
                ref.current?.click();
              }}>
              <CameraIcon className={classes.uploadBtnImage} />
              Compartenos tus logros *
            </Button>
            {files?.length ? <p>{files.length} Archivos cargado</p> : ''}
          </Grid>

          <Grid item xs={12} md={8} container justifyContent='center'>
            <Button
              className={classes.submitBtn}
              variant='contained'
              disabled={valid}
              type='submit'>
              Enviar
            </Button>
          </Grid>
        </form>
      </Grid>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        className={classes.dialog}>
        <p>
          Tus datos han sido guardados <br />
          satisfactoriamente
        </p>
        <Button variant='text' onClick={() => handleClose()}>
          cerrar
        </Button>
      </Dialog>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Grid>
  );
}
