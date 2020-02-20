import React from 'react';
import Avatar from '@material-ui/core/Avatar';
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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
}));


export default function SignUpComp() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        phoneNumber: '5319221766',
        namee: "Seçkin",
        surname: "Özdemir",
        password: "1111111",
        email: "seckinbrke12345@gmail.com",
        passwordRepeat: "",
        
    });

    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value,
        });
    };
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }
    const singUp = async () => {

        let REQUEST_URL = 'http://192.168.102.2:4000/users/create';
        let body = {
            name: values.namee,
            surname: values.surname,
            password: values.password,
            email: values.email,
            address:"asdfads",
            phoneNumber: 0 + values.phoneNumber,
            creditCardNo:null,
            creditCardDate:null,
            creditCardCvc:null,
        }
        console.log(body)
        await axios.post(REQUEST_URL, body)
            .then(response => response)
            .then(responseData => {
                console.warn(responseData.data)

            })
            .catch(error => {
                console.log(error)
            })
    }
    console.log(values.password)
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
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
                                onChange={handleInputChange}
                                error={false}
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
                                error={false}
                                value={values.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
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
                        //     type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={singUp}
                        className={classes.submit}
                    >
                        Üye Ol
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