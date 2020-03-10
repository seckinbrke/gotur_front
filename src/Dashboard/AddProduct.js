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
import axios from 'axios';
import { history } from '../App';
import AlertModal from '../components/AlertModal/AlertModal';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainListItems, secondaryListItems } from './listItems';
//import Chart from './Chart';



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
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}));


export default function AddProduct() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(!open);
	};
	const [values, setValues] = React.useState({
		productPhoto: '',
		namee: "",
		price: "",
		showAlert: false,
		alertInfo: "",
	});
	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}
	const handleClose = () => {
		setValues({
			...values,
			alertInfo: "Tüm alanları doğru girdiğinizden emin olunuz.",
			showAlert: false
		})
	};

	// const singUp = async () => {
	//     if (
	//         values.email.trim().length === 0 ||
	//         values.password.trim().length === 0 ||
	//         values.namee.trim().length === 0 ||
	//         values.surname.trim().length === 0 ||
	//         values.phoneNumber.trim().length === 0 ||
	//         values.address.trim().length === 0
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
	//             let REQUEST_URL = 'http://goturapp.herokuapp.com/users/create';
	//             let body = {
	//                 name: values.namee,
	//                 surname: values.surname,
	//                 password: values.password,
	//                 email: values.email,
	//                 address: values.address,
	//                 phoneNumber: 0 + values.phoneNumber,
	//                 creditCardNameSurname: null,
	//                 creditCardNo: null,
	//                 creditCardDate: null,
	//                 creditCardCvc: null,
	//                 isAdmin: false
	//             }
	//             console.log(body)
	//             await axios.post(REQUEST_URL, body)
	//                 .then(response => response)
	//                 .then(responseData => {
	//                     //
	//                     if (responseData.status === 200) {
	//                         console.log(responseData)
	//                         history.push({ pathname: "/" })
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
		<div className={classes.root}>
			<CssBaseline />
			<Drawer
				variant="permanent"
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container component="main" maxWidth="xs">
					<AlertModal openAlert={values.showAlert} closePopUp={handleClose} alertInfo={values.alertInfo} />
					{/* <CssBaseline /> */}
					<div className={classes.paper1}>
						<Typography component="h1" variant="h5" style={{ color: '#4F34A3' }}>
							Ürün Ekle
</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									{/* */}
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
										label="Ürün Adi"
										autoFocus
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										value={values.price}
										onChange={handleInputChange}
										error={false}
										autoComplete="fname"
										name="price"
										variant="outlined"
										required
										fullWidth
										id="price"
										label="Fiyat"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										value={values.productPhoto}
										onChange={handleInputChange}
										error={values.erroremail}
										//helperText={values.hasMail ? "Bu mail kullanılmaktadır." : ""}
										variant="outlined"
										required
										fullWidth
										id="productPhoto"
										label="urun fotograf url"
										name="productPhoto"
										autoComplete="url"
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
			</main>
		</div>

	);
}