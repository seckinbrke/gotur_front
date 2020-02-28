import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
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
import MaskedInput from 'react-text-mask';
import Modal from '@material-ui/core/Modal';
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
    },
    helperText: {
        color: 'red'
    }
}));


export default function Payment() {
    const classes = useStyles();
    const rootRef = React.useRef(null);
    const [values, setValues] = React.useState({
        fullName: "",
        creditCardNo: "",
        creditCardDate: "",
        creditCardCvc: "",
        showAlert: false
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

    // const singUp = async () => {
    //     if (
    //         values.email.trim().length === 0 ||
    //         values.password.trim().length === 0 ||
    //         values.namee.trim().length === 0 ||
    //         values.surname.trim().length === 0 ||
    //         values.phoneNumber.trim().length === 0
    //     ) {
    //         setValues({
    //             ...values,
    //             showAlert: true
    //         })
    //     } else {
    //         let checkPass = checkPassword();
    //         let checkPhone = checkPhoneNumber();
    //         if (checkPass === false || checkPhone === false) {
    //             alert('Bilgilerinizi kontrol ediniz.')
    //             //Buraya güzel alert tasarla
    //         } else {
    //             let REQUEST_URL = 'http://localhost:3001/users/create';
    //             let body = {
    //                 name: values.namee,
    //                 surname: values.surname,
    //                 password: values.password,
    //                 email: values.email,
    //                 address: "asdfads",
    //                 phoneNumber: 0 + values.phoneNumber,
    //                 creditCardNo: null,
    //                 creditCardDate: null,
    //                 creditCardCvc: null,
    //                 isAdmin:false
    //             }
    //             console.log(body)
    //             await axios.post(REQUEST_URL, body)
    //                 .then(response => response)
    //                 .then(responseData => {
    //                     let errorKeys = Object.keys(responseData.data.errors);
    //                     for (let i = 0; i < errorKeys.length; i++) {
    //                         //       console.log(responseData.data.errors[errorKeys[i]].message)
    //                         setValues({ ...values, ["error" + [errorKeys[i]]]: true })
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.log("sdfsd")
    //                     console.log(error)
    //                 })
    //         }
    //     }
    // }
    return (
        <Container component="main" maxWidth="xs">
            <AlertModal openAlert={values.showAlert} closePopUp={handleClose}/>
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" style={{ color: '#4F34A3' }}>
                    Ödeme Ekranı
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={values.email}
                                onChange={handleInputChange}
                                error={values.erroremail}
                                //helperText={values.hasMail ? "Bu mail kullanılmaktadır." : ""}
                                variant="outlined"
                                required
                                fullWidth
                                id="cardowner"
                                label="Kart Sahibinin Adi"
                                name="cardowner"
                                autoComplete="cardowner"
                            />
                            {/* <FormHelperText className={classes.helperText} >{values.hasMail ? "Bu mail kullanılmaktadır." : ""}</FormHelperText> */}
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
                                name="creditcard"
                                label="Kredi Karti Numarasi"
                                type="creditcard"
                                id="creditcard"
                                autoComplete="creditcard"
                            />
                            {/* <FormHelperText className={classes.helperText}>{values.password.length < 7 ? "Şifre en az 7 haneli olmalıdır." : ""}</FormHelperText> */}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                error={false}
                                value={values.passwordRepeat}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="expiredate"
                                label="Son Kullanma Tarihi"
                                type="expiredate"
                                id="expiredate"
                                autoComplete="expiredate"
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                                label="CVC"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // onClick={singUp}
                        className={classes.submit}
                        style={{ backgroundColor: '#4F34A3' }}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Ödemeyi Tamamla
                      </Button>
                    <Grid container justify="flex-end">
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}