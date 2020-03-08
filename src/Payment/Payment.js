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
import AlertModal from '../components/AlertModal/AlertModal';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios';
import { history } from '../App';
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


export default function Payment() {
    const classes = useStyles();
    const [userInfo, setUserInfo] = React.useState("");
    React.useEffect(() => {
        let userInformation = JSON.parse(localStorage.getItem('userInformation'));
        setUserInfo(userInformation[0] === undefined ? {} : userInformation[0])
        console.log(userInformation[0])
    }, [])
    const [values, setValues] = React.useState({
        creditCardNameSurname: "",
        creditCardNo: "",
        creditCardDate: "",
        creditCardCvc: "",
        showAlert: false,
        alertInfo: ""
    });
    const handleInputChange = e => { 
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const updateCard = async () => {
        if (
            values.creditCardNameSurname.trim().length === 0 ||
            values.creditCardNo.trim().length === 0 ||
            values.creditCardDate.trim().length === 0 ||
            values.creditCardCvc.trim().length === 0
        ) {
            setValues({
                ...values,
                alertInfo: "Tüm alanları doğru girdiğinizden emin olunuz.",
                showAlert: true
            })
        } else {
            if (values.creditCardNameSurname.trim().length === 0 ||
                values.creditCardNo.trim().length < 16 ||
                values.creditCardDate.trim().length < 5 ||
                values.creditCardCvc.trim().length < 3) {
                alert('Bilgilerinizi kontrol ediniz.')
                //Buraya güzel alert tasarla
            } else {
                let REQUEST_URL = 'http://goturapp.herokuapp.com/users/updateCardInfo/'+ userInfo.USER_ID;
                let body = {
                    //_id: userInfo.USER_ID,
                    creditCardNo: values.creditCardNo,
                    creditCardDate: values.creditCardDate,
                    creditCardCvc: values.creditCardCvc,
                    creditCardNameSurname: values.creditCardNameSurname 
                }
                console.log(body)
                await axios.put(REQUEST_URL, body)
                    .then(response => {
                        console.log(response);
                        setValues({
                            ...values,
                            alertInfo: "Bilgileriniz GoturPayment© guvencesi ile kayit edilmistir! Simdi ana sayfaya aktarilacaksiniz",
                            showAlert: true
                        })
                        setTimeout(() => {
                            history.push({ pathname: "/anasayfa"})
                        }, 3000);
                        
                    })
                    
                    .catch(error => {
                        console.log("sdfsd")
                        console.log(error)
                    })
            }
        }
    }

    const handleClose = () => {
        setValues({
            ...values,
            showAlert: false
        })
    };
    return (
        <Container component="main" maxWidth="xs">
            <AlertModal openAlert={values.showAlert} closePopUp={handleClose} alertInfo={values.alertInfo} />
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" style={{ color: '#4F34A3' }}>
                    Ödeme Ekranı
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div id="PaymentForm">
                                <Cards
                                    cvc={values.creditCardCvc}
                                    expiry={values.creditCardDate}
                                    //focus={values.focus}
                                    name={values.creditCardNameSurname}
                                    number={values.creditCardNo} />

                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={values.creditCardNameSurname}
                                onChange={handleInputChange}
                                //error={values.erroremail}
                                //helperText={values.hasMail ? "Bu mail kullanılmaktadır." : ""}
                                variant="outlined"
                                required
                                fullWidth
                                id="creditCardNameSurname"
                                label="Kart Sahibinin Adi"
                                name="creditCardNameSurname"
                                autoComplete="cardowner"
                                type="text"
                            />
                            {/* <FormHelperText className={classes.helperText} >{values.hasMail ? "Bu mail kullanılmaktadır." : ""}</FormHelperText> */}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                //error={values.errorpassword}
                                value={values.creditCardNo}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                //helperText="Şifre en az 7 haneli olmalıdır."
                                name="creditCardNo"
                                label="Kredi Karti Numarasi"
                                type="number"
                                id="creditCardNo"
                                autoComplete="creditcard"
                            />
                            {/* <FormHelperText className={classes.helperText}>{values.password.length < 7 ? "Şifre en az 7 haneli olmalıdır." : ""}</FormHelperText> */}
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                error={false}
                                value={values.creditCardDate}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="creditCardDate"
                                label="Son Kullanma Tarihi"
                                // type="expiredate"
                                id="creditCardDate"
                                autoComplete="expiredate"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={values.creditCardCvc}
                                onChange={handleInputChange}
                                error={false}
                                autoComplete="fname"
                                name="creditCardCvc"
                                variant="outlined"
                                required
                                fullWidth
                                id="creditCardCvc"
                                label="CVC"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={updateCard}
                        className={classes.submit}
                        style={{ backgroundColor: '#4F34A3' }}
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Kaydet
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