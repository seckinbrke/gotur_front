import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ErrorIcon from '@material-ui/icons/Error';
import axios from 'axios';
import { history } from '../App';
import AlertModal from '../components/AlertModal/AlertModal'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        Sebear
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignInSide() {
  const classes = useStyles();
  const rootRef = React.useRef(null);
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showAlert: false,
    alertInfo: "Tüm alanları doğru girdiğinizden emin olunuz."
  });
  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const handleClose = () => {
    setValues({
        ...values,
        showAlert: false
    })
 };

  const login = async () => {
    if (
      values.email.trim().length === 0 ||
      values.password.trim().length === 0
    ) {
      setValues({
        ...values,
        showAlert: true
      })
    } else {
      let REQUEST_URL = 'http://goturapp.herokuapp.com/users/login';
      let body = {
        password: values.password,
        email: values.email,
      }
      console.log(body)
      await axios.post(REQUEST_URL, body)
        .then(response => response)
        .then(responseData => {
          if (responseData.status === 200) {
            let userInformation = [
              {
                USER_ACCESS_TOKEN: responseData.data.token,
                USER: responseData.data.user,
                USER_ID: responseData.data.user._id
              }
            ]
            localStorage.setItem('userInformation', JSON.stringify(userInformation));
            history.push({ pathname: "/anasayfa" })
          }
        })
        .catch(error => {
          console.log(error)
          setValues({
            ...values,
            showAlert: true
          })
        })
    }
  }
  // <LockOutlinedIcon />
  return (
    <Grid container component="main" className={classes.root}>
      <AlertModal openAlert={values.showAlert} closePopUp={handleClose} alertInfo={values.alertInfo} />
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/*<Avatar className={classes.avatar}>
          </Avatar> */}
          <Typography component="h1" variant="h5" style={{ color: '#4F34A3' }}>
            Üye Girişi
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={values.email}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={values.password}
              onChange={handleInputChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Beni Hatırla"
            />
            <Button
              onClick={login}
              //type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Giriş
            </Button>
            <Grid container>
              { /*  <Grid item xs>
                <Link href="#" variant="body2">
                  Şifremi unuttum
                </Link>
           </Grid>*/}
              <Grid item>
                <Link href="/uyeOl" variant="body2">
                  {"Hesabınız yok mu? Kayıt ol"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cora-images.s3.eu-central-1.amazonaws.com/1582201606802)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#4F34A3'
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    width: 400,
    borderRadius: 10,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid 4F34A3',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  alertButton: {
    backgroundColor: '#5D3DBD',
    color: '#FFD10D'
  },

}));