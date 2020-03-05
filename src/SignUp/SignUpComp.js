import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import axios from 'axios';
import { history } from '../App';
import AlertModal from '../components/AlertModal/AlertModal';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Sebear
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    root1: {
        height: 300,
        flexGrow: 1,
        minWidth: 300,
        transform: 'translateZ(0)',
        // The position fixed scoping doesn't work in IE 11.
        // Disable this demo to preserve the others.
        '@media all and (-ms-high-contrast: none)': {
            display: 'none',
        },
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
    helperText: {
        color: 'red'
    }
}));


export default function SignUpComp() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        phoneNumber: '5',
        namee: "",
        surname: "",
        password: "",
        email: "",
        passwordRepeat: "",
        hasMail: false,
        erroremail: false,
        errorpassword: false,
        showAlert: false,
        alertInfo: ""
    });
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    const checkPassword = () => {
        if (values.password !== values.passwordRepeat || values.password.trim().length < 7) {
            return false;
        } else {
            return true;
        }
    }
    const checkPhoneNumber = () => {
        if (values.phoneNumber.trim().length < 10) {
            return false;
        } else {
            return true;
        }
    }
    const emailApiCheck = async () => {
        let REQUEST_URL = 'http://goturapp.herokuapp.com/users/emailcheck';
        let body = {
            email: values.email
        }
        await axios.post(REQUEST_URL, body)
            .then(response => response)
            .then(responseData => {
                setValues({
                    ...values,
                    hasMail: responseData.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleClose = () => {
         setValues({
             ...values,
             alertInfo: "Tüm alanları doğru girdiğinizden emin olunuz.",
             showAlert: false
         })
      };

    const singUp = async () => {
        if (
            values.email.trim().length === 0 ||
            values.password.trim().length === 0 ||
            values.namee.trim().length === 0 ||
            values.surname.trim().length === 0 ||
            values.phoneNumber.trim().length === 0
        ) {
            setValues({
                ...values,
                showAlert: true
            })
        } else {
            let checkPass = checkPassword();
            let checkPhone = checkPhoneNumber();
            if (checkPass === false || checkPhone === false) {
                alert('Bilgilerinizi kontrol ediniz.')
                //Buraya güzel alert tasarla
            } else {
                let REQUEST_URL = 'http://goturapp.herokuapp.com/users/create';
                let body = {
                    name: values.namee,
                    surname: values.surname,
                    password: values.password,
                    email: values.email,
                    address: values.email,
                    phoneNumber: 0 + values.phoneNumber,
                    creditCardNameSurname:null,
                    creditCardNo: null,
                    creditCardDate: null,
                    creditCardCvc: null,
                    isAdmin:false
                }
                console.log(body)
                await axios.post(REQUEST_URL, body)
                    .then(response => response)
                    .then(responseData => {
                        //
                        if(responseData.status === 200){
                            console.log(responseData)
                            history.push({ pathname: "/anasayfa"})
                        }
                    })
                    .catch(error => {
                        console.log("sdfsd")
                        console.log(error)
                    })
            }
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            {/* {alertModal()} */}
            <AlertModal openAlert={values.showAlert} closePopUp={handleClose} alertInfo={values.alertInfo} />
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" style={{ color: '#4F34A3' }}>
                    Üye Ol
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={values.namee}
                                onChange={handleInputChange}
                                error={false}
                                autoComplete="fname"
                                name="namee"
                                variant="outlined"
                                required
                                fullWidth
                                id="namee"
                                label="Ad"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={values.surname}
                                onChange={handleInputChange}
                                error={false}
                                variant="outlined"
                                required
                                fullWidth
                                id="surname"
                                label="Soyad"
                                name="surname"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.email}
                                onPointerLeave={emailApiCheck}
                                onChange={handleInputChange}
                                error={values.erroremail}
                                //helperText={values.hasMail ? "Bu mail kullanılmaktadır." : ""}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                            <FormHelperText className={classes.helperText} >{values.hasMail ? "Bu mail kullanılmaktadır." : ""}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={values.errorpassword}
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                //helperText="Şifre en az 7 haneli olmalıdır."
                                name="password"
                                label="Şifre"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormHelperText className={classes.helperText}>{values.password.length < 7 ? "Şifre en az 7 haneli olmalıdır." : ""}</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={false}
                                value={values.passwordRepeat}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordRepeat"
                                label="Şifre Tekrarı"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.phoneNumber}
                                onChange={handleInputChange}
                                error={false}
                                autoComplete="fname"
                                name="phoneNumber"
                                variant="outlined"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Telefon Numarası"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={singUp}
                        className={classes.submit}
                        style={{ backgroundColor: '#4F34A3' }}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Üye ol
                      </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2">
                                Giriş Yap
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}