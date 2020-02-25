import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaskedInput from 'react-text-mask';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';


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
function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
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
    }
}));


export default function SignUpComp() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [values, setValues] = React.useState({
        phoneNumber: '5319221766',
        namee: "Seçkin",
        surname: "Özdemir",
        password: "1111111",
        email: "",
        passwordRepeat: "",
        hasMail: false,
        erroremail: false,
        errorpassword: false,
        showAlert: false
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
        let REQUEST_URL = 'http://localhost:3001/users/emailcheck';
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
                console.log(responseData.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const alertModal = () => {
        return (
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={values.showAlert}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
                <div className={classes.paperModal}>
                    <div className={classes.paper} style={{ marginTop: 0 }}>
                        <ErrorIcon style={{ alignSelf: 'center', marginTop: 0, fontSize: 60, marginBottom: 20, color: '#5D3DBD' }} />
                        <h2 id="server-modal-title" className={classes.paper} style={{ marginTop: 0 }}>Uyarı</h2>
                        <p id="server-modal-description" className={classes.paper} style={{ marginTop: 0 }}>Tüm alanları doğru girdiğinizden emin olunuz.</p>
                        <Button
                            onClick={() => setValues({
                                ...values,
                                showAlert: false
                            })}
                            fullWidth
                            variant="outlined"
                            className={classes.alertButton}
                        >Tamam</Button>
                    </div>
                </div>
            </Modal>
        )
    }
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
            } else {
                let REQUEST_URL = 'http://localhost:3001/users/create';
                let body = {
                    name: values.namee,
                    surname: values.surname,
                    password: values.password,
                    email: values.email,
                    address: "asdfads",
                    phoneNumber: 0 + values.phoneNumber,
                    creditCardNo: null,
                    creditCardDate: null,
                    creditCardCvc: null,
                }
                console.log(body)
                await axios.post(REQUEST_URL, body)
                    .then(response => response)
                    .then(responseData => {
                        let errorKeys = Object.keys(responseData.data.errors);
                        for (let i = 0; i < errorKeys.length; i++) {
                            //       console.log(responseData.data.errors[errorKeys[i]].message)
                            setValues({ ...values, ["error" + [errorKeys[i]]]: true })
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
            {alertModal()}
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
                                helperText={values.hasMail ? "Bu mail kullanılmaktadır." : ""}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={values.errorpassword}
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                helperText="Şifre en az 7 haneli olmalıdır."
                                name="password"
                                label="Şifre"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
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
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Yeni gelişmeler hakkında mail üzerinden bilgi almak istiyorum."
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