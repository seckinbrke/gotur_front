/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainListItems, secondaryListItems } from './listItems';
import '../components/Category/CategoryItem/CategoryItem.css'
import { getCategories } from '../Api/CatagoryAPI';
import ProductCategory from './ProductCard';
import Spinner from '../components/Spinner/Spinner';
{/*function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Sebear
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}*/}

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
        borderWidth: 1,
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

export default function Products(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = async () => {
        let responseData = await getCategories();
        if (responseData !== null || responseData !== undefined) {
            setCategories(responseData)
            setTimeout(() => {
                setIsVisible(false)
            }, 1500);
            console.log(responseData);
        }
    };

    const handleDrawerClose = () => {
        setOpen(!open);
    };
    const renderCategories = () => {
        if (isVisible === true) {
            return (
                <div>
                    <Spinner />
                </div>
            )
        } else {
            return categories.map((item, index) => {
                return (
                    <ProductCategory item={item} key={index} />
                )
            })
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
            <main className={classes.content} style={{color:'black', textAlign:'center'} }>
                <div className={classes.appBarSpacer} />

                <Container maxWidth="lg" className={classes.container} style={{ flexDirection: 'row', flex: 1} }>
                    {renderCategories()}
                </Container>

            </main>
        </div >
    );
}

/*
<Grid container spacing={3}>
        {/* Chart

{/* Recent Deposits

{/* Recent Orders
<Grid item xs={12}>
<Paper className={classes.paper}>
<Orders />
</Paper>
</Grid>
</Grid>
<Box pt={4}>
<Copyright />
</Box>
*/