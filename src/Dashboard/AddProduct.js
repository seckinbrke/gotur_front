import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { history } from '../App';
import AlertModal from '../components/AlertModal/AlertModal';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainListItems, secondaryListItems } from './listItems';
import { getCategories, getSubTypes, addProduct } from '../Api/CatagoryAPI';

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

const BootstrapInput = withStyles(theme => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);


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
	margin: {
		margin: theme.spacing(1),
	},
}));


export default function AddProduct() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [categoryData, setCategoryData] = React.useState([]);
	const [subData, setSubData] = React.useState([]);
	const [mainType, setMainType] = React.useState("");
	const [subType, setSubType] = React.useState("");
	React.useEffect(() => {
		getCategory();
		getSubCategory()
	}, [mainType])
	const handleDrawerClose = () => {
		setOpen(!open);
	};
	const [values, setValues] = React.useState({
		productPhoto: "",
		namee: "",
		price: "",
		showAlert: false,
		alertInfo: "",
	});
	const handleInputChange = e => {
		const { name, value } = e.target
		setValues({ ...values, [name]: value })
	}
	const handleCategoryChange = e => {
		const mainTypes = e.target.value
		console.log(e.target.value);
		setMainType(mainTypes)
	}
	const handleSubChange = e => {
		const subTypes = e.target.value
		console.log(e.target.value);
		setSubType(subTypes)
	}
	const handleClose = () => {
		setValues({
			...values,
			alertInfo: "Tüm alanları doğru girdiğinizden emin olunuz.",
			showAlert: false
		})
	};
	const getCategory = async () => {
		let responseData = await getCategories();
		if (responseData !== null || responseData !== undefined) {
			setCategoryData(responseData)
			console.log(responseData);
		}
	};
	const getSubCategory = async () => {
		let body = { mainType: mainType }
		console.log(body);

		let responseData = await getSubTypes({ body: body });
		if (responseData !== null || responseData !== undefined) {
			setSubData(responseData)
			console.log(responseData);
		}
	};
	const renderCategory = () => {
		return categoryData.map(data => {
			return <option value={data.mainType}>{data.mainType}</option>
		})
	}
	const renderSubCategory = () => {
		return subData.map(data => {
			return <option value={data}>{data}</option>
		})
	}

	const AddProducts = async () => {
		let body = {
			name: values.namee,
			productPhoto: values.productPhoto,
			price: values.price,
			mainType: mainType,
			subType: subType,
		}
		console.log(body);
		
	    if (
	        values.productPhoto.trim().length === 0 ||
	        values.price.trim().length === 0 ||
	        values.namee.trim().length === 0 ||
	        mainType.trim().length === 0 ||
	        subType.trim().length === 0
	    ) {
	        setValues({
				...values,
				alertInfo: "Girdiginiz bilgilerin dogrulugundan emin olunuz.",
	            showAlert: true
	        })
	    } else {
	            let body = {
	                name: values.namee,
	                productPhoto: values.productPhoto,
	                price: values.price,
	                mainType: mainType,
	                subType: subType,
				}
				let responseData = await addProduct({body: body});
				if (responseData !== null || responseData !== undefined) {
					console.log(responseData);
				}        
	    }
	}
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
										helperText={values.hasMail ? "Bu mail kullanılmaktadır." : ""}
										variant="outlined"
										required
										fullWidth
										id="productPhoto"
										label="Ürün Fotoğraf Url"
										name="productPhoto"
										autoComplete="url"
									/>
								</Grid>
								<InputLabel style={{ marginLeft: "8px" }} htmlFor="demo-customized-select-native">Kategoriler</InputLabel>
								<FormControl className={classes.margin}>
									<Grid item xs={12}>
										<NativeSelect style={{ width: "396px" }}
											id="demo-customized-select-native"
											value={mainType}
											onChange={handleCategoryChange}
											input={<BootstrapInput />}
										>
											<option value="" />
											{renderCategory()}

										</NativeSelect>
									</Grid>
								</FormControl>
								<InputLabel style={{ marginLeft: "8px" }} htmlFor="demo-customized-select-native">Alt Kategoriler</InputLabel>
								<FormControl className={classes.margin}>
									<Grid item xs={12}>
										<NativeSelect style={{ width: "396px" }}
											id="demo-customized-select-native"
											value={subType}
											onChange={handleSubChange}
											input={<BootstrapInput />}
										>
											<option value=""/>
											{renderSubCategory()}
										</NativeSelect>
									</Grid>
								</FormControl>

							</Grid>
							<Button
								onClick={AddProducts}
								className={classes.submit}
								style={{ backgroundColor: '#4F34A3', marginTop: "20px" }}
								fullWidth
								variant="contained"
								color="primary"
							>
								Ürün Ekle
  						</Button>

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